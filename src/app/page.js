import { createClient } from "contentful";
import Image from "next/image";

const client = createClient({
  space: process.env.CONTENT_SPACE_ID,
  accessToken: process.env.CONTENT_DELIVERY_TOKEN,
});

async function getContent() {
  const entries = await client.getEntries({
    limit: 1,
    content_type: "landingPage",
  });

  const { items } = entries;

  return items;
}

function compressToFields(obj) {
  obj.hasOwnProperty("metadata") && delete obj["metadata"];
  obj.hasOwnProperty("sys") && delete obj["sys"];

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] == "object") {
      obj[key] = compressToFields(obj[key]);
    }
  });

  return { ...(obj.fields || obj) };
}

export default async function Landing() {
  const page = await getContent();

  const elements = compressToFields(page)[0];

  return (
    <main>
      <section className="hero">
        <div
          className="hero-bg"
          style={{
            backgroundImage:
              "url(https:" + elements.heroBanner.background.file.url + ")",
          }}
        ></div>
        <div className="hero-content">
          <img
            src={"https:" + elements.heroBanner.banner.file.url}
            // {...elements.heroBanner.banner.file.details.image}
            alt="banner"
          />
          <span>
            <h1>{elements.heroBanner.title}</h1>
            <a href="#" className="cta-btn">
              {elements.heroBanner.ctaButton}
            </a>
          </span>
        </div>
      </section>
      {elements.featured && (
        <>
          <section className="featured">
            <div className="section-content">
              <h1>Featured</h1>
              <img
                src={"https:" + elements.featured.banner.file.url}
                alt="pikmin-feature-banner"
              />
              <span>
                <h3>{elements.featured.hookText}</h3>
                <a href="#" className="cta-btn">
                  {elements.featured.ctaButton}
                </a>
              </span>
              <div className="game-list">
                {elements.freshGames && (
                  <>
                    {Object.keys(elements.freshGames).map((key) => {
                      const card = elements.freshGames[key];
                      return (
                        <>
                          <a href="#" className="game-card">
                            <div className="game-card-img-wrapper">
                              <img
                                src={"https:" + card.thumbnail.file.url}
                                alt={card.titleSlug}
                              />
                            </div>
                            <div className="game-card-info">
                              <h3>{card.title}</h3>
                              <span className="platform">
                                <p>{card.platform}</p>
                              </span>
                            </div>
                          </a>
                        </>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </section>
        </>
      )}
      {elements.characters && (
        <>
          <section className="characters">
            <div className="section-content">
              <h1>Characters</h1>
              <div className="character-grid">
                {Object.keys(elements.characters).map((key) => {
                  const character = elements.characters[key];

                  return (
                    <div className="character-card">
                      <a href="#" className="image-wrapper">
                        <div className="character-bg">
                          <img
                            src={"https:" + character.background.file.url}
                            alt={character.titleSlug + " background"}
                          />
                        </div>
                        <div className="character-mug">
                          <img
                            src={"https:" + character.character.file.url}
                            alt={character.titleSlug + " mug"}
                          />
                        </div>
                      </a>
                      <h1>{character.name}</h1>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </>
      )}
      {/* {JSON.stringify(elements)} */}
    </main>
  );
}
