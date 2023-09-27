import React, { FC } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface Props {
children?: React.ReactNode;
}

const RequireAuth: FC<Props> = ({ children }: Props) => {
let location = useLocation();

const user = JSON.parse(localStorage.getItem("funcionario_info" ?? "{}") as any );
let jwt = user.funcionario_token;
console.log('jwt', jwt);

if (!jwt) {
return <Navigate to="/" state={{ from: location }} />;
}

return <>{children}</>;
};

export default RequireAuth;




