import styles from "./page.module.css";
import { getTranslator } from "@/i18n/getDictionary";
import { intlLocales } from "@/i18n/config";
import { metadataFor } from "@/lib/seo";
import { teamMembers } from "@/data/about";
import { CUSTOMER_COUNT, FOUNDED_YEAR, PRODUCT_COUNT, TEAM_SIZE, yearsInBusiness } from "@/data/siteStats";
import StatGrid from "@/components/common/StatGrid";
import RotatingWord from "@/components/common/RotatingWord";
import MemberCard from "@/components/about/MemberCard";
import CardDeck from "@/components/about/CardDeck";
import CtaBlock from "@/components/layout/CtaBlock";

export const generateMetadata = metadataFor("about", "/about");

export default async function About({ params }) {
  const { lang } = await params;
  const { t, tList } = await getTranslator(lang);

  // Line 2 "{word} çap" → text before the word, and text after it (which
  // rotates together with the word, see RotatingWord).
  const [heroBefore, heroAfter = ""] = t("about.heroLine2").split("{word}");
  const years = yearsInBusiness();
  const yearsUnit = t(`stats.yearsUnit.${new Intl.PluralRules(intlLocales[lang]).select(years)}`);

  return (
    <>
      <section className={`container page-hero ${styles.hero}`}>
        <div>
          <p className="badge">{t("about.badge")}</p>
          <h1>
            <span className="sr-only">{t("about.heroSr", { year: FOUNDED_YEAR })}</span>
            <span aria-hidden="true">
              <span className={styles.line}>{t("about.heroLine1", { year: FOUNDED_YEAR })}</span>
              <span className={styles.line}>
                {heroBefore}
                <RotatingWord words={tList("about.heroWords")} after={heroAfter} wordClassName="accent-text" />
              </span>
            </span>
          </h1>
          <p className="page-lead">{t("about.p1", { year: FOUNDED_YEAR })}</p>
        </div>
        <CardDeck />
      </section>

      <section className="container" aria-label={t("stats.label")}>
        <StatGrid
          label={t("stats.label")}
          items={[
            { value: `${years} ${yearsUnit}`, label: t("stats.experience") },
            { value: CUSTOMER_COUNT, label: t("stats.customers") },
            { value: TEAM_SIZE, label: t("stats.team") },
            { value: PRODUCT_COUNT, label: t("stats.products") },
          ]}
        />
      </section>

      <section className={`container section reveal ${styles.story}`} aria-labelledby="story-title">
        <div>
          <h2 id="story-title">{t("about.storyTitle")}</h2>
          <hr className={styles.rule} />
          <p className={styles.storyText}>{t("about.story", { year: FOUNDED_YEAR })}</p>
          <p className={styles.storyText}>{t("about.p2")}</p>
        </div>
        <div>
          <h3 className="sr-only">{t("about.featuresTitle")}</h3>
          <ul className={styles.features}>
            {tList("about.features").map((feature) => (
              <li key={feature.title}>
                <div className={styles.feature}>
                  <h4 className={styles.featureTitle}>{feature.title}</h4>
                  <p className={styles.featureText}>{feature.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container section reveal" aria-labelledby="team-title">
        <div className={styles.teamHead}>
          <h2 id="team-title">{t("about.teamTitle")}</h2>
        </div>
        <ul className={styles.team}>
          {teamMembers.map((member) => (
            <li key={member.name}>
              <MemberCard member={member} role={t(`about.roles.${member.role}`)} />
            </li>
          ))}
        </ul>
      </section>

      <CtaBlock lang={lang} />
    </>
  );
}
