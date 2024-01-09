"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Home {
    getHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            return `
            <div class="home">
                <div class="container">
                    <div class="home__content">
                        <div class="home__text">
                            <div class="home__title"><h1>Exchange Books With People Like you</h1></div>
                            <div class="home__message">
                                <ol>
                                    <li>Exchanging books has never been this easy.</li>
                                    <li>Search for your desired book.</li>
                                    <li>Send a swap request along with your library of books.</li>
                                    <li>If they find your library interesting you are ready to swap.</li>
                                    <li>Books you request are yours to keep or swap again.</li>
                                </ol>
                            </div>
                        </div>
                        <img class="home__image" src="/static/assets/image.svg"/>
                    </div>
                </div>
            </div>
        `;
        });
    }
}
exports.default = Home;
