import React, { useState, ChangeEvent } from 'react';
import { Icon, Input, Grid, Button } from 'semantic-ui-react';
import { useHttp } from 'hooks/http.hooks';

export const AuthRoute: React.FC<{}> = () => {
  const [form, setForm] = useState({});
  const { loading, error, request, clearError } = useHttp();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleLogin = async (): Promise<void> => {
    try {
      const data = await request('/api/auth/login', {
        method: 'POST',
        body: { ...form },
      });
      console.log('data: ', data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleRegister = async (): Promise<void> => {
    try {
      const data = await request('/api/auth/register', {
        method: 'POST',
        body: { ...form },
      });
      console.log('data: ', data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Grid centered columns={2}>
      <Grid.Column>
        <Grid.Row>
          <Input iconPosition="left" placeholder="Email">
            <Icon name="at" />
            <input name="email" onChange={handleChange} />
          </Input>
        </Grid.Row>
        <Grid.Row>
          <Input iconPosition="left" type="Password">
            <Icon name="key" />
            <input name="password" onChange={handleChange} />
          </Input>
        </Grid.Row>
        <Grid.Row>
          <Button disabled={loading} primary onClick={handleLogin}>
            Login
          </Button>
          <Button disabled={loading} secondary onClick={handleRegister}>
            Register
          </Button>
        </Grid.Row>
      </Grid.Column>
    </Grid>
  );
};
