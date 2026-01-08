import axios from "axios";
import { useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import { ClipLoader } from "react-spinners";

function EditProfile() {
  const navigate = useNavigate();
  const { userdata } = useSelector((state) => state.user);
  const [name, setName] = useState(userdata?.name || "");
  const [description, setDescription] = useState(userdata?.description || "");
  const [photoUrl, setPhotoUrl] = useState(userdata?.photoUrl || null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("photoUrl", photoUrl);

  const handleEditProfile = async () => {
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/user/updateprofile",
        formData,
        { withCredentials: true }
      );
      dispatch(setUserData(result.data));
      setLoading(false);
      navigate('/')
      toast.success('Profile Updated')
    } catch (error) {
      console.log(error, "Edit profile Error");
      toast.error("Edit Profile Failed");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-10 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full relative">
        <RxCross1
          onClick={() => navigate("/profile")}
          className="absolute top-[8%] right-[5%] w-[22px] h-[22px] cursor-pointer"
        />

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Edit Profile
        </h2>
        <form 
        onSubmit={(e)=> e.preventDefault()}
        className="space-y-5">
          <div className="flex flex-col items-center text-center">
            {userdata?.photoUrl ? (
              <img
                src={userdata?.photoUrl}
                alt="User Image"
                className="w-24 h-24 rounded-full object-cover border-4 border-[black]"
              />
            ) : (
              <div className="w-24 h-24 rounded-full flex items-center justify-center text-[30px] object-cover border-4 border-[white] bg-black text-white font-bold">
                {userdata?.name.slice(0, 1).toUpperCase()}
              </div>
            )}
          </div>

          <div>
            <label
              className="text-sm font-medium text-gray-700"
              htmlFor="avtar"
            >
              Select Avatar
            </label>
            <input
              onChange={(e) => setPhotoUrl(e.target.files[0])}
              className="w-full px-4 py-2 border rounded-md text-sm"
              type="file"
              name="photoUrl"
              placeholder="photoUrl"
              accept="image/*"
              id="avtar"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="name">
              User Name
            </label>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="w-full px-4 py-2 border rounded-md text-sm"
              type="text"
              placeholder={userdata?.name}
              id="name"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="">
              Email
            </label>
            <input
              className=" cursor-grab w-full px-4 py-2 border rounded-md text-sm"
              type="text"
              placeholder={userdata?.email}
              id="email"
              readOnly
            />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700" htmlFor="bio">
              Bio
            </label>
            <textarea
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              name="description"
              className="w-full mt-1 px-4 py-2 border rounded-md border-gray-300 resize-none focus:ring-[black] focus:ring-2"
              rows={3}
              placeholder="Tell us about Yourself "
              id="bio"
            />
          </div>
          <button
          onClick={handleEditProfile}
          className="w-full bg-[black] active:bg-[#454545] text-white py-2 rounded-md font-medium transition cursor-pointer " disabled={loading}>
            {loading ? <ClipLoader size={30} color="white"/> : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditProfile;
