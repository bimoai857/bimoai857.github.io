export default class Home {
    async getHtml() {
        
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
                        <img class="home__image" src="/public/assets/image.svg"/>
                    </div>
                </div>
            </div>
        `;
    }
}
