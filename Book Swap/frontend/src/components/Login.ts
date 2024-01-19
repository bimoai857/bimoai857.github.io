export default class Login {
    async getHtml() {
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
    }
}
