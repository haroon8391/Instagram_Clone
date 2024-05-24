import MiniProfile from "./MiniProfile";
import Posts from "./Posts";

export default function Feed() {
  return (
    <main>
      <section>
        <Posts />
      </section>
      <section>
        <MiniProfile />
      </section>
    </main>
  );
}
