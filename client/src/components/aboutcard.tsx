import './css/aboutcard.css';

export default function About() {
    return (
        <div className="about-container">
            <main className="about-main">
                <section className="about-section">
                    <h2 className="title-main1">About Seedsmart 🌱</h2>
                    <p>
                        Seedsmart is an innovative plant discovery app designed to help you learn more about the world of plants. 
                        Whether you're a seasoned gardener or someone who just loves nature, this app will provide you with information 
                        about a wide variety of plants. From their scientific names to stunning images, we aim to make plant exploration 
                        accessible to all!
                    </p>
                    <h3>Our Mission</h3>
                    <p>
                        Our mission is to foster a love for nature and promote environmental awareness. By providing an easy-to-use 
                        platform for identifying and learning about plants, we hope to inspire individuals to connect with their 
                        environment, grow their own plants, and contribute to a more sustainable planet.
                    </p>

                    <h3>How It Works</h3>
                    <p>
                        You can start exploring by simply typing the scientific name of any plant you encounter. The app will search 
                        a large database of plant species and display relevant results with images and descriptions. You can also check 
                        out our "Plant of the Day" feature, where we highlight a different plant every day.
                    </p>

                    <h3>Get Involved</h3>
                    <p>
                        We encourage you to share your plant discoveries with us! You can submit images and plant names, and help build 
                        the Seedsmart community.
                    </p>
                </section>
            </main>

            <footer className="app-footer">
                <p>&copy; 2025 Seedsmart. All rights reserved.</p>
            </footer>
        </div>
    );
}
