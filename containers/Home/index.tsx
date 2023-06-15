import { Folder, GitHub, Link } from "react-feather";

export const About = () => {
  return (
    <>
      <b>Alemanac</b> is the world&apos;s first and only digital platform
      specially brewed for beer enthusiasts and knowledge seekers. Our name is a
      playful blend of &apos;Ale&apos;, a beloved type of beer with rich history
      and taste, and &apos;Almanacv, a traditional handbook filled with a wealth
      of information. Alemanac embodies this spirit, offering a unique blend of
      beer lore, brewing wisdom, and community interaction. <br />
      <br />
      At Alemanac, we believe that every pint has a story to tell. Our platform
      enables you to explore and discover these stories, offering in-depth
      insights about ales from all over the world, from the well-known to the
      hidden gems. Whether you&apos;re a casual beer drinker, a homebrewer, or a
      beer connoisseur, Alemanac is your go-to resource to learn about different
      beer styles, brewing techniques, pairing suggestions, and much more.{" "}
      <br />
      <br />
      But Alemanac is more than just an encyclopedia of ales. It&apos;s also a
      vibrant community of like-minded ale enthusiasts from around the globe.
      Share your personal reviews, participate in engaging discussions, attend
      virtual tastings, and even share your own homebrew recipes.
      <br />
      <br />
      Join us in this journey of exploration and camaraderie. Alemanac is where
      your love for a great pint and the thirst for knowledge come together.
      Grab your favorite beer, sit back, and explore the wonderful world of ales
      with Alemanac. Cheers to knowledge, one pint at a time!
    </>
  );
};

export const Developer = () => {
  return (
    <>
      <h3 className="font-bold text-2xl mb-2 hidden lg:block">
        About Kim Fajardo{" "}
      </h3>
      Hello! I&apos;m Kim Fajardo, the front-end engineer behind Alemanac. With
      a love for beer and a passion for technology, I&apos;ve created this
      platform to celebrate the rich tradition, culture, and precision that go
      into every pint.
      <br />
      <br />
      While I spend my days coding and improving Alemanac, my off-duty hours are
      filled with travel, fitness, and outdoor adventures. I believe in
      balancing the digital with the physical, constantly exploring new
      experiences.
      <br />
      <br />
      My vision for Alemanac is simple. I aim to create a space where beer
      enthusiasts can explore, learn, and appreciate the stories behind their
      favorite brews. Remember, every celebration becomes more memorable with a
      good toast, but always drink responsibly!
      <br />
      <br />
      This revised version maintains the key points of your story while being
      significantly shorter. If there are any other adjustments you&apos;d like,
      please let me know.
      <div className="mt-10 flex space-x-4 ">
        <Link
          className="flex space-x-4 items-center py-2 px-3 rounded-lg hover:bg-amber-500 w-max transition"
          href="https://github.com/kimpfajardo"
          target="_blank"
        >
          <GitHub />
          <span>Github</span>
        </Link>
        <Link
          className="flex space-x-4 items-center py-2 px-3 rounded-lg hover:bg-amber-500 w-max transition"
          href="https://kim-fajardo.vercel.app/"
          target="_blank"
        >
          <Folder />
          <span>Portfolio</span>
        </Link>
      </div>
    </>
  );
};
