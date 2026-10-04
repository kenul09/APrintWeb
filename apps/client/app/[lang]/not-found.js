import Link from "next/link";
import { lang as rootLang } from "next/root-params";
import styles from "./status.module.css";
import { getTranslator } from "@/i18n/getDictionary";
import { defaultLocale, hasLocale, localizePath } from "@/i18n/config";
import { ArrowLeftIcon } from "@/components/icons/Icons";

export default async function NotFound() {
  const value = await rootLang();
  const lang = hasLocale(value) ? value : defaultLocale;
  const { t } = await getTranslator(lang);

  return (
    <section className={`container ${styles.wrap}`}>
      <p className={styles.code} aria-hidden="true">
        404
      </p>
      <h1>{t("notFound.title")}</h1>
      <p className={styles.text}>{t("notFound.text")}</p>
      <Link href={localizePath(lang, "/")} className="btn-primary">
        <ArrowLeftIcon size={18} />
        {t("notFound.cta")}
      </Link>
    </section>
  );
}
