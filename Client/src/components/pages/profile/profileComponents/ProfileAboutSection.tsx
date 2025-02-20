type ProfileAboutSectionProps = {
  bio?: string;
};

const ProfileAboutSection = ({ bio }: ProfileAboutSectionProps) => {
  return (
    <article>
      {/* about */}
      <section className="mt-8 bg-secondary-800 rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">About</h2>
        <p>{bio || "No bio yet"}</p>
      </section>
    </article>
  );
};

export default ProfileAboutSection;
