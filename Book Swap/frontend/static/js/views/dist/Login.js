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
class Login {
    getHtml() {
        return __awaiter(this, void 0, void 0, function* () {
            return `
        <div class='auth'>
        <div class='card'>
            <div class="card__border"></div>
            <div class="card__container">
                <div class='auth__content'>
                    <h3>Login Form</h3> 
                    <div class="auth__form">
                      <div>
                        <input placeholder="Username"/>
                      </div>
                      <div>
                        <input placeholder="Password" type="password"/>
                      </div>
                      <button class="form__button">Login</button>
                    </div>
                 
                </div>
               
                <div>
            </div>
           
    </div>
      
        `;
        });
    }
}
exports.default = Login;
