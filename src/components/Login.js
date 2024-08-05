import React from "react";
import "../App.css"
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="d-flex justify-content-center">
      <form class="form">
        <span class="input-span">
          <label for="email" class="label">
            Email
          </label>
          <input type="email" name="email" id="email" />
        </span>
        <span class="input-span">
          <label for="password" class="label">
            Password
          </label>
          <input type="password" name="password" id="password" />
        </span>
        <input class="submit" type="submit" value="Log in" />
        <span class="span">
          Don't have an account? <Link to="/register">Sign up</Link>
        </span>
      </form>
    </div>
  );
}