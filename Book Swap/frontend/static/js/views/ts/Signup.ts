export default class Signup {
    
  async getHtml() {
      return `
      <div class='auth'>
          <div class='card'>
              <div class="card__border"></div>
              <div class="card__container">
                  <div class='auth__content'>
                      <h3>Signup Form</h3> 
                      <div class="auth__form">
                          <div>
                              <input id="usernameInput" placeholder="Username"/>
                          </div>
                          <div>
                              <input placeholder="Password"/>
                          </div>
                          <div class="auth__name">
                              <div class="auth__firstName">
                                  <input placeholder="First Name"/>
                              </div>
                              <div class="auth__lastName">
                                  <input placeholder="Last Name"/>
                              </div>
                          </div>
                      </div>
                  </div>
                  <button class="form__button">Register</button>
              </div>
          </div>
      </div>
      `;
      
  }
}
