import React, {Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Badge, Nav, NavItem, NavLink as RsNavLink} from 'reactstrap';
import classNames from 'classnames';
import nav from './_nav';

class Sidebar extends Component{

    constructor(props){
        super(props);

        this.handleClick = this.handleClick.bind(this);
        this.activeRoute = this.activeRoute.bind(this);

        
    }
    activeRoute(routeName, props) {
        // return this.props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
        return props.location.pathname.indexOf(routeName) > -1 ? 'nav-item nav-dropdown open' : 'nav-item nav-dropdown';
    
      }

      handleClick(e) {
        e.preventDefault();
        e.target.parentElement.classList.toggle('open');
      }

    render (){

        const props = this.props;

        const isExternal = (url) => {
            const link = url ? url.substring(0, 4) : '';
            return link === 'http';
        };
        const badge = (badge) => {
            if (badge) {
              const classes = classNames( badge.class );
              return (<Badge className={ classes } color={ badge.variant }>{ badge.text }</Badge>)
            }
          };

        const navLink = (item, key, classes) => {
            const url = item.url ? item.url : '';
            return (
              <NavItem key={key} className={classes.item}>
                { isExternal(url) ?
                  <RsNavLink href={url} className={classes.link} active>
                    <i className={classes.icon}></i>{item.name}{badge(item.badge)}
                  </RsNavLink>
                  :
                  <NavLink to={url} className={classes.link} activeClassName="active" onClick={this.hideMobile}>
                    <i className={classes.icon}></i>{item.name}{badge(item.badge)}
                  </NavLink>
                }
              </NavItem>
            )
          };
        
        
        const navItem = (item, key) => {
            const classes = {
              item: classNames( item.class) ,
              link: classNames( 'nav-link', item.variant ? `nav-link-${item.variant}` : ''),
              icon: classNames( item.icon )
            };
            return (
              navLink(item, key, classes)
            )
        };

        const navDropdown = (item, key) => {
            return (
              <li key={key} className={this.activeRoute(item.url, props)}>
                <a className="nav-link nav-dropdown-toggle" href="#" onClick={this.handleClick}><i className={item.icon}></i>{item.name}</a>
                <ul className="nav-dropdown-items">
                  {navList(item.children)}
                </ul>
              </li>)
          };

        const navType = (item, idx) =>
            item.title ? title(item, idx) :
            item.divider ? divider(item, idx) :
            item.label ? navLabel(item, idx) :
            item.children ? navDropdown(item, idx)
                            : navItem(item, idx) ;
        

        const navList = (items) => {
            return items.map( (item, index) => navType(item, index) );
        };

        return (
            <div className="sidebar">
                <nav className="sidebar-nav">
                    <Nav>
                        {navList(nav.items)}
                    </Nav>
                </nav>
            </div>

        )
    }


}
export default Sidebar;