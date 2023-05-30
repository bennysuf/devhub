import { useState, useContext } from "react";
import { UserContext } from "../App";

export default function EditAdmin() {
  const { admin, navigate, setAdmin, devs, setDevs } = useContext(UserContext);

  const { username, public_profile, resume, about, social_links } = admin;

  const [aboutPage, setAboutPage] = useState(about);
  const [resumeUrl, setResumeUrl] = useState(resume);
  const [socialLinks, setSocialLinks] = useState(social_links);
  const [newUsername, setNewUsername] = useState(username);
  const [publicProfile, setPublicProfile] = useState(public_profile);
  const [errors, setErrors] = useState("");

  function handleAboutChange(e) {
    e.preventDefault();
    setAboutPage(e.target.value);
  }
  function handleResumeChange(e) {
    e.preventDefault();
    setResumeUrl(e.target.value);
  }
  function handleSocialChange(e) {
    e.preventDefault();
    setSocialLinks(e.target.value);
  }
  function handleUsernameChange(e) {
    e.preventDefault();
    setNewUsername(e.target.value);
  }

  const update = {
    about: aboutPage,
    social_links: socialLinks,
    resume: resumeUrl,
    username: newUsername,
    public_profile: publicProfile,
  };

  function handleSubmit(e) {
    setErrors("");
    e.preventDefault();

    fetch(`/developers/${admin.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(update),
    }).then((r) => {
      if (r.ok) {
        // r.json().then((d) => console.log("edit data", d));
        r.json().then((d) => {
          setAdmin(d);
          setDevs(
            devs.map((dev) => {
              return dev.id !== d.id ? dev : d;
            })
          );
        });
        navigate("/admin");
      } else {
        r.json().then((err) => {
          setErrors(err.error);
          window.scrollTo(0, 0);
        });
      }
    });
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="input">
          <br />
          <label style={{ marginLeft: "3%", width: "fit-content" }}>
            {/* //TODO: how to have the onChange effect only the checkbox? */}
            <input
              type="checkbox"
              id="terms"
              name="terms"
              checked={publicProfile}
              value={publicProfile.toString()}
              onChange={() => setPublicProfile(!publicProfile)}
            />
            Public profile {publicProfile ? "ON" : "OFF"}
          </label>
          <br />
          <h3 style={{ marginLeft: "3%" }}>{errors}</h3>
          <label>
            Username
            <input
              placeholder="username"
              value={newUsername}
              onChange={handleUsernameChange}
            />
          </label>
          <label>
            Resume URL
            <input
              placeholder="Resume link"
              value={resumeUrl}
              onChange={handleResumeChange}
            />
          </label>
          <label>
            Social links
            <input
              placeholder="Social links"
              value={socialLinks}
              onChange={handleSocialChange}
            />
          </label>
          <label>
            About page
            <textarea
              placeholder="About page"
              value={aboutPage}
              onChange={handleAboutChange}
              style={{ height: "500px" }}
            />
          </label>
        </div>
        <button type="submit" className="button">
          Submit
        </button>
        <br />
      </form>
    </>
  );
}
