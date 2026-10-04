import Image from "next/image";
import styles from "./MemberCard.module.css";

// `role` is the already-translated role label.
export default function MemberCard({ member, role }) {
  return (
    <article className={styles.card}>
      <div className={styles.avatar}>
        {member.photo ? (
          <Image src={member.photo} alt="" fill sizes="64px" className={styles.photo} />
        ) : (
          <span aria-hidden="true">{member.initials}</span>
        )}
      </div>
      <h3 className={styles.name}>{member.name}</h3>
      <p className={styles.role}>{role}</p>
    </article>
  );
}
