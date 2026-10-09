import type { ImpactBullet } from "@/lib/data/projects";
import { Stat } from "./stat";

export function ImpactBulletText({ bullet }: { bullet: ImpactBullet }) {
  return (
    <>
      {bullet.map((segment, index) =>
        typeof segment === "string" ? (
          <span key={index}>{segment}</span>
        ) : (
          <Stat key={index}>{segment.stat}</Stat>
        ),
      )}
    </>
  );
}
