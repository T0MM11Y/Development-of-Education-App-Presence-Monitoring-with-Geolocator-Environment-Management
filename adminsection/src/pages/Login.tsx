import React from "react";

const Login = () => {
  return (
    <div className="cls-content">
      <div className="cls-content-sm panel">
        <div className="panel-body">
          <div className="mar-ver pad-btm">
            <center>
              <img src="TutWuriHandayani.png" alt="" width={"169em"} />
              <br />
              <br />
              <h3 className="h4 mar-no">Account Login</h3>
              <p className="text-muted">Sign In to your account</p>
            </center>
          </div>
          <form action="#">
            <div className="form-group">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                autoFocus
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
              />
            </div>
            <div className="checkbox pad-btm text-left">
              <input
                id="demo-form-checkbox"
                className="magic-checkbox"
                type="checkbox"
              />
              <label htmlFor="demo-form-checkbox">Remember me</label>
            </div>
            <button className="btn btn-primary btn-lg btn-block" type="submit">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
