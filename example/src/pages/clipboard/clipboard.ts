import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {
  Plugins
} from '@capacitor/core';

declare var window: any;
/**
 * Generated class for the ClipboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-clipboard',
  templateUrl: 'clipboard.html',
})
export class ClipboardPage {
  base64Image: string;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.loadImage();
  }
  async loadImage() {
    const toDataURL = (url) => fetch(url)
    .then((response: Response) => response.blob())
    .then(blob => new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onloadend = () => {
        this.base64Image = reader.result.replace('data:;base64,', '');
      }
      reader.onerror = reject
      reader.readAsDataURL(blob)
    }))
    
    toDataURL('assets/ionitron.png');
    
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ClipboardPage');
  }

  clipboardSetString() {
    Plugins.Clipboard.write({
      string: "Hello, Moto"
    });
  }

  async clipboardGetString() {
    let str = await Plugins.Clipboard.read({
      type: "string"
    });
    console.log('Got string from clipboard:', str.value);
  }

  clipboardSetURL() {
    Plugins.Clipboard.write({
      url: "http://google.com/"
    });
  }

  async clipboardGetURL() {
    let url = await Plugins.Clipboard.read({
      type: "url"
    });
    console.log("Get URL from clipboard", url.value);
  }

  clipboardSetImage () {
    this.base64Image = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAF4AAABkCAMAAAA47XeXAAACl1BMVEVHiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv9Hiv8y1QNIAAAA3HRSTlMAAQIDBAUGBwgJDA4PERITFBUWFxkaGxwdHyAhIiMlJicoKSorLC0uLzAxMjQ1Njc4OTo7PD0+P0BBQkNERUZISUpLTE1OT1BRUlNUVVdYWVpcXV5hYmNlZmdoamtsbW5vcHFyc3R1dnd7fH1+gIGCg4SFhoeIiYqLjI2Oj5CRkpWWl5iZmpucnp+hoqOmqKqrrq+wsbKztLW2t7i5uru8vb/AwsTFxsjJysvMzc7P0NHS09TV1tfZ29zd3t/g4eLj5OXm5+jp6uvs7e7v8PHy8/T19vf4+fr7/P3+9kEMhQAABHFJREFUGBm1wYlfk3UAB+DvoM0F4kGhggkmiomgZKmlJB5pXkkpqFmeiWkUaaZm3ooJeZSYokSaoQZih8hd5NQtZKUoCtvY949pE3h5x8e9e9+9P54HgU061nD36qaEpFeToiDexnaS7saLheeLC/Oyl5kg1CLS2Vhx6tCuDSYY55PLIFD8oWay3eGixwog2uqcDmGMn98speQnA0K2ToUw/S5deXE6JfWGAcuTIExo8QkDZlDy68h5URBn/I8AolvZZV8/iBS9MxzAXnZyJECsKXsyJiePLmOH1RDNGJ0wemBE7kOStQvRW4bNsXAnetFJXkQv2sG/zOg96WyLRe8Z7uJi9J5naxsy4GUym40Qb3DclMxPv7lwrbqutrL07MGN6UlhEGVg2s4iK3toKNiY3Ae6GWfl2ehHVc5Y6DIo63cqcZ5dYEKwnt98lwGVp4ciGOb1VqpS+ga0m1RG1b4eBG3M21zUwLIAWoy4TI12m6DaVBs1++E5qJTRyiBUxkOVVQzOrTFQYR2DZUtEQMsYPEs8AkhzUYfKSCga1URdikOhIPwaddoCBYeoWxr8muambrUD4Ed4HQU4AD9yKIIjBU8V+4BClBjwNPkUZBaeIq6FglwJO3N4AnrIpTDjcunKgo/I/yjMkRSSSyD3AcVpHl5L2iLRzVBOgd7JJbkD3UY5KFD+PJLWvpCspUh/TmwjOReSCxTJNfMmye/QJbKZQq36mWSDGR1C51Cs/BMkXYnwGLS5sOIhxSo5So8lAGLr+ISDAlUfo8cWwPQLO9y5SnH+OU2P74HF7OTec5nCPCqlxzUYytnFsqCFojjr6VGHEQ5K1n9GUdrv08OKTHarjrFTKDt2UWbSbgplx3nK7H+JQllRRZl6cxlFqsVtyrhjNlOkMtgpl/4KRcqHnXJ7+z+mQMtxh3JFhnqK0xaLasrVoYjiFAIllGuJ2E9hnGOAPPqI20RRHmUA2EAf49ZQiHvbs8bCYy59vLaaQhSjwwuPKZeaRc3uV1nZ0zp0CKmgXOoXDMBtaaKPozHG/tlO+mhPQKddlHv9OJVdTg6LXPGI3c7CK4c+rhvR6WXKTSmnoroIeKxwUzIbXkNbKbcNXUw32O1B6r9UlA2vZ+opSYbXgHuUcSdCsoHdquZT2VI8cZWSVfBKcVGmJASSvrco+XY7lR2AV/9GSixxAMIuUG4hZFZScrCCyponwuMIZe7kzF7zG+Vq+kDGeJGdWosYyP1PJsw8Q2WZ8BFzkx0cbRSgwgRfI/+gQG+ip75Z5899tXKJnQIUwJ+l1K9pGPwqom4Z8C/6FnU6CiXTnNTlejgUvU89GkchgO0MXksqAjrAYLXOgQr7GJzHb0GVrQyGfQZUes9BzWrGQrXpf1Ojc1HQYPApatGabYA2mTaqdikFmg3Jc1IV21oTgjH+pJsB2bdEIVgT8u5RUU32EOgx9MPydvrxoODtMOgVkvjR6dvsqb0y790YCBIxefmXhWU1lkZ7k63hxqXjHy8abYQK/wP54yFE7fSfjwAAAABJRU5ErkJggg==";
    console.log('Setting image', this.base64Image);
    Plugins.Clipboard.write({
      image: this.base64Image
    });
  }

  async clipboardGetImage() {
    const image = await Plugins.Clipboard.read({
      type: "image"
    });
    console.log('Got image', image.value);
  }
}
