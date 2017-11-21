import { getPlugins, PluginType, Plugin } from "../../plugin";
import { prepareIOS, getIOSPlugins } from "./common";
import { log, writeFileAsync, runCommand, readFileAsync } from "../../common";
import { exit } from "shelljs";
import { join } from "path";
import { IOS_PATH, IOS_RUNTIME_POD, IOS_MIN_VERSION } from "../../config";
const opn = require('opn');


export async function updateIOS(needsUpdate: boolean) {
  const plugins = await getPlugins();
  await prepareIOS();
  await updatePlugins(plugins, needsUpdate);

  log('DONE! Native modules are updated 🎉');
  log('Opening your xcode workspace, hold on a sec...');
  opn(`${IOS_PATH}/AvocadoApp.xcworkspace`); // TODO, we should find the xcode, no hardcoded
}

export async function updatePlugins(allPlugins: Plugin[], needsUpdate: boolean) {
  const plugins = await getIOSPlugins(allPlugins);

  log('found', plugins.length, 'native modules\n',
  plugins.map(p => p.id).join('\n'), '\n');

  await autoGeneratePods(plugins);
  await installCocoaPodsPlugins(plugins, needsUpdate);
}

export async function autoGeneratePods(plugins: Plugin[]): Promise<void[]> {
  return Promise.all(plugins
    .filter(p => p.ios!.type === PluginType.Code)
    .map(async p => {
      const name = p.ios!.name = p.name;
      p.ios!.type = PluginType.Cocoapods;

      const content = generatePodspec(name);
      const path = join(p.ios!.path, name + '.podspec');
      return writeFileAsync(path, content);
    }));
}

export function generatePodspec(name: string) {
  return `
  Pod::Spec.new do |s|
    s.name = '${name}'
    s.version = '0.0.1'
    s.summary = 'Autogenerated spec'
    s.license = 'Unknown'
    s.homepage = 'https://example.com'
    s.authors = { 'Avocado generator' => 'hi@ionicframework.com' }
    s.source = { :git => 'https://github.com/ionic-team/avocado.git', :tag => '0.0.1' }
    s.source_files = '*.{swift,h,m}'
  end`;
}

export async function installCocoaPodsPlugins(plugins: Plugin[], needsUpdate: boolean) {
  const pods = plugins
    .filter(p => p.ios!.type === PluginType.Cocoapods);

  await updatePodfile(pods, needsUpdate);
}

export async function updatePodfile(plugins: Plugin[], needsUpdate: boolean) {
  log('🐎 cocoapods is resolving native dependencies...');

  const content = generatePodFile(plugins);
  const podfilePath = join(IOS_PATH, 'Podfile');
  await writeFileAsync(podfilePath, content, 'utf8');
  if (needsUpdate) {
    await runCommand(`cd ${IOS_PATH} && pod update`);
  } else {
    await runCommand(`cd ${IOS_PATH} && pod install`);
  }
}

export function generatePodFile(plugins: Plugin[]) {
  // project 'AvocadoApp.xcodeproj'
  const pods = plugins
    .map((p) => `pod '${p.ios!.name}', :path => '${p.ios!.path}'`);

  pods.push(IOS_RUNTIME_POD);

  return `
    platform :ios, '${IOS_MIN_VERSION}'
    use_frameworks!

    target 'AvocadoApp' do
      ${pods.join('\n')}
    end`;
}