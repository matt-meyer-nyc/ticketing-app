import { useState } from 'react';
// import axios from 'axios';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

export default () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [errors, setErrors] = useState([]);
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const onSubmit = async (event) => {
    event.preventDefault();

    await doRequest();

    /*------ABSTRCTED OUT WITH doRequest hook
		try {
      const response = await axios.post('/api/users/signup', {
        email,
        password,
      });
      console.log(response.data);
    } catch (err) {
      setErrors(err.response.data.errors);
		}
		*/
  };

  return (
    <form onSubmit={onSubmit}>
      <h1>Sign Up</h1>
      <div className="form-gropu">
        <label>Email Address</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="form-gropu">
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control"
          type="password"
          className="form-control"
        />
      </div>
      {
        errors

        // since errors defatuls to null, don't have to see if any exist by checking lentgth either

        /* -----ABSTRACTED OUT with doRequest hook
				 <div className="alert alert-danger">
				 <h4>Ooops...</h4>
				 <ul className="my-0">
					 {err.response.datea.errors.map((err) => (
						 <li key={err.message}>{err.message}</li>
					 ))}
				 </ul>
			 </div>
			 */
      }
      <button className="btn btn-primary">Sign Up</button>
    </form>
  );
};
