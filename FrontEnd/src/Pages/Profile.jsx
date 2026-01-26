import { useEffect, useState } from "react";
import "./CSS/Profile.css";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({
    phone: "",
    gender: "",
    dob: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  /* ================= FETCH PROFILE ================= */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_API_BACKEND_URL}/user/profile`,
          {
            headers: {
              "auth-token": localStorage.getItem("auth-token"),
            },
          }
        );

        setUser(res.data.user);
        setForm({
          phone: res.data.user.phone || "",
          gender: res.data.user.gender || "",
          dob: res.data.user.dob
            ? res.data.user.dob.split("T")[0]
            : "",
        });
      } catch (error) {
        console.error("Profile fetch failed", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* ================= INPUT HANDLER ================= */
  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /* ================= SAVE PROFILE ================= */
  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await axios.put(
        `${import.meta.env.VITE_API_BACKEND_URL}/user/profile`,
        form,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      setUser(res.data.user);
      alert("Profile updated successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  /* ================= AVATAR UPLOAD ================= */
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const fd = new FormData();
    fd.append("avatar", file);

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BACKEND_URL}/user/avatar`,
        fd,
        {
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );

      setUser((prev) => ({ ...prev, avatar: res.data.avatar }));
    } catch (err) {
      console.error(err);
      alert("Avatar upload failed");
    }
  };

  if (loading) {
    return <div className="profile-page">Loading profile...</div>;
  }

  if (!user) {
    return <div className="profile-page">User not found</div>;
  }

  return (
    <div className="profile-page">
      <h2>My Profile</h2>

      <div className="profile-card">
        {/* AVATAR */}
        <div className="avatar-section">
          <img
            src={
              user.avatar && user.avatar.trim() !== ""
                ? user.avatar
                : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
            }
            alt=""
            className="profile-avatar"
            onError={(e) => {
              e.target.src =
                "https://cdn-icons-png.flaticon.com/512/149/149071.png";
            }}
          />
          <label className="avatar-upload">
            Change Avatar
            <input type="file" hidden onChange={handleAvatarUpload} />
          </label>
        </div>

        {/* READ ONLY */}
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>

        {/* EDITABLE */}
        <div className="profile-field">
          <label>Phone</label>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />
        </div>

        <div className="profile-field">
          <label>Gender</label>
          <select name="gender" value={form.gender} onChange={handleChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="profile-field">
          <label>Date of Birth</label>
          <input type="date" name="dob" value={form.dob} onChange={handleChange} />
        </div>

        {/* META INFO */}
        <p>
          <strong>Joined:</strong>{" "}
          {new Date(user.createdAt).toDateString()}
        </p>
        {user.lastLogin && (
          <p>
            <strong>Last Login:</strong>{" "}
            {new Date(user.lastLogin).toLocaleString()}
          </p>
        )}

        {/* SAVE BUTTON */}
        <button onClick={handleSave} disabled={saving}>
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
