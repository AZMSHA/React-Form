import "./App.css";
import { useContext, useState } from "react";
import { validateEmail } from "./utils";
import { UserID } from "./index";

const PasswordErrorMessage = () => {
  return (
    <p className="FieldError">Password should have at least 8 characters</p>
  );
};

function App({childData}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState({
    value: "",
    isTouched: false,
  });
  const [role, setRole] = useState("role");
  const [logged,toggleStatus] = useState(false)

  function checkPassLength(password) {
    return (password.value.length > 7)
  }

  const getIsFormValid = () => {
    const condition = validateEmail(email)&&checkPassLength(password)&&firstName&&(role!=="role")
    return condition
  };

  const clearForm = () => {
    setEmail("");
    setFirstName("");
    setLastName("");
    setPassword({
      value: "",
      isTouched: false,
    });
    setRole("role");
  };

  const handleSubmit = (e) => {
    childData(firstName)
    e.preventDefault();
    clearForm();
    alert("Account created!");
    toggleStatus(true)
  };

  return (
    <>
    {logged?<Child/>:
    <div className="App">
      <form onSubmit={(e) => handleSubmit(e)}>
        <fieldset>
          <h2>Sign Up</h2>
          <div className="Field">
            <label>
              First name <sup>*</sup>
            </label>
            <input
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
            />
          </div>
          <div className="Field">
            <label>Last name</label>
            <input
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
            />
          </div>
          <div className="Field">
            <label>
              Email address <sup>*</sup>
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
            />
          </div>
          <div className="Field">
            <label>
              Password <sup>*</sup>
            </label>
            <input
              type="password"
              value={password.value}
              onChange={(e) =>
                setPassword({
                  ...password,
                  value: e.target.value,
                })
              }
              onBlur={() => setPassword({ ...password, isTouched: true })}
              placeholder="Password"
            />
            {password.isTouched && !checkPassLength(password) ? (
              <PasswordErrorMessage />
            ) : (
              ""
            )}
          </div>
          <div className="Field">
            <label>
              Role <sup>*</sup>
            </label>
            <select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="role">Role</option>
              <option value="individual">Individual</option>
              <option value="business">Business</option>
            </select>
          </div>
          <button type="submit" disabled={!getIsFormValid()}>
            Create account
          </button>
        </fieldset>
      </form>
    </div>}
    </>
  );
}

function Child() {
  const ID = useContext(UserID)
  return <h1>Welcome {ID}</h1>
}

export default App;
