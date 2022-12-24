import Image from "next/image";

import Logo from "../public/logo.png";

const ApplicationLogo = props => <Image src={Logo} alt="" {...props} />;

export default ApplicationLogo;
