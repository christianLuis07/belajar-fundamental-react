import React from "react";
import { Link, useNavigate } from "react-router-dom";
import RegisterInput from "../components/RegisterInput";
import { register } from "../utils/api";
import { LocaleConsumer } from "../contexts/LocaleContext";

function RegisterPage() {
  const navigate = useNavigate();
  async function onRegisterHandler(user) {
    const { error } = await register(user);
    if (!error) {
      navigate("/");
    }
  }

  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <section className="register-page">
            <h2>
              {locale === "id"
                ? "Gak Perlu serius serius ya isinya..."
                : "No need to be serious to Fill it..."}
            </h2>
            <RegisterInput register={onRegisterHandler} />
            <p>
              {locale === "id"
                ? "Sudah Punya akun?"
                : "Already have an account?"}{" "}
              <Link to="/login">{locale === "id" ? "Masuk" : "Login"}</Link>
            </p>
          </section>
        );
      }}
    </LocaleConsumer>
  );
}

export default RegisterPage;
