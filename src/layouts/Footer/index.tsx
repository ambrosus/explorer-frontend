import React from 'react'
import { NavLink } from 'react-router-dom'

import { AmbrosusLogoFooter } from './AmbrosusLogoFooter'
import footerSocials from './SocialsIcon'

/*
 * @param {Component} Icon - icon of social network (Facebook, Twitter, Instagram, etc.)
 * <Component /> - component of icon with props (name, link, etc.)
 */
const icons = footerSocials.map((Component) => <Component key={Component} />)

export const Footer = () => (
	<footer className="footer">
		<div className="container">
			<div className="footer__container">
				<div className="logoFooter">
					<NavLink to="/">
						<AmbrosusLogoFooter />
					</NavLink>
				</div>
				<div className="mail">
					<a href="mailto:support@ambrosus.io">support@ambrosus.io</a>
				</div>
				<div className="socials-icons">{icons}</div>
			</div>
		</div>
	</footer>
)
