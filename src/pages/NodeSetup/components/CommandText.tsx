import React, {useState} from 'react';
import Warning from "../Warning";

const CommandText: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(true);

  return (
    <div className="command-text">
      <p className="command-text__title">Command text</p>
      <button className={`command-text__btn ${isOpen ? 'command-text__btn_open' : ''}`} type="button" onClick={() => setIsOpen((state) => !state)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
        >
          <path
            d="M8 13.293L16 21.293L24 13.293"
            stroke="#1D1D1D"
            strokeWidth="1.52381"
            strokeLinecap="round"
          />
        </svg>
      </button>
      {isOpen && (
        <div className="command-text__info">
          {isWarningOpen && (
            <Warning onClose={() => setIsWarningOpen(false)}>
              You need to use the private key from the address when starting the server.
            </Warning>
          )}
          <div className="command-text__code">
            <p>#!/bin/bash</p>
            <br/>
            <p>{`# Change /etc/needrestart/needrestart.conf to skip confirmations for restarting required services`}</p>
            <p>{`sed -i 's/^#\\$nrconf{restart} = '\\''i'\\'';/$nrconf{restart} = '\\''a'\\'';/' /etc/needrestart/needrestart.conf`}</p>
            <br/>
            <p>{`#Intall node.js`}</p>
            <p>{`apt-get update -y`}</p>
            <p>{`apt-get install -y ca-certificates curl gnupg`}</p>
            <p>{`mkdir -p /etc/apt/keyrings`}</p>
            <p>{`curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /etc/apt/keyrings/nodesource.gpg`}</p>
            <p>{`echo \\`}</p>
            <p className="code-tab">{`"deb [signed-by=/etc/apt/keyrings/nodesource.gpg] https://deb.nodesource.com/node_18.x nodistro main" |`}</p>
            <p>{`sudo tee /etc/apt/sources.list.d/nodesource.list`}</p>
            <p>{`apt-get update -y`}</p>
            <p>{`apt-get install -y nodejs`}</p>
            <br/>
            <p>{`# Install required packages`}</p>
            <p>{`apt-get install -y \\`}</p>
            <p className="code-tab">{`python-dev \\`}</p>
            <p className="code-tab">build-essential \</p>
            <p className="code-tab">npm \</p>
            <p className="code-tab">git \</p>
            <p className="code-tab">apt-transport-https \</p>
            <p className="code-tab">software-properties-common \</p>
            <p className="code-tab">jq</p>
            <br/>
            <p># Install Docker and Docker Compose</p>
            <p>curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg</p>
            <p>echo \</p>
            <p className="code-tab">{`"deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \\`}</p>
            <p className="code-tab">{`$(lsb_release -cs) stable" | tee /etc/apt/sources.list.d/docker.list > /dev/null`}</p>
            <br/>
            <p>apt-get update -y</p>
            <p>apt-get install -y \</p>
            <p className="code-tab">docker-ce \</p>
            <p className="code-tab">docker-ce-cli \</p>
            <p className="code-tab">containerd.io</p>
            <br/>
            <p>{`curl -L https://github.com/docker/compose/releases/download/v2.21.0/docker-compose-"$(uname -s)"-"$(uname -m)" -o /usr/local/bin/docker-compose`}</p>
            <p>{`sudo chmod +x /usr/local/bin/docker-compose`}</p>
            <br/>
            <p># Install yarn globally</p>
            <p>npm install -g yarn</p>
            <br/>
            <p>{`# todo remove branch simplify-nop`}</p>
            <p>{`git clone -b simplify-nop https://github.com/ambrosus/ambrosus-nop.git`}</p>
            <p>{`cd ambrosus-nop || return`}</p>
            <p>{`./update.sh`}</p>
            <p>{`yarn install`}</p>
            <p>yarn build</p>
            <p>yarn start</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommandText;
