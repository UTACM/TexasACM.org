var header = ""
+  '<h1><a href="index.html">Association for Computing Machinery <span>at UT Austin</span></a></h1>'
+  '	<nav id="nav">'
+  '		<ul>'
+  '			<li>'
+  '				<a href="index.html" class="submenu" id="Home">Home</a>'
+  '				<ul>'
+  '					<li><a href="index.html#mc-embedded-subscribe-form">Mailing List</a></li>'
+  '					<li><a href="index.html#recent-iframe">Current Events</a></li>'
+  '					<li><a href="index.html#upcoming-iframe">Upcoming Events</a></li>'
+  '				</ul>'
+  '			</li>'
+  '			<li>'
+  '				<a href="about.html" class="submenu" id="About">About</a>'
+  '				<ul>'
+  '					<li><a href="about.html#benefits">About Us</a></li>'
+  '					<li><a href="about.html#why-join">Why Join</a></li>'
+  '					<li><a href="about.html#about-office">Our Office</a></li>'
+  '					<li><a href="about.html#about-team">Our Team</a></li>'
+  '				</ul>'
+  '			</li>'
+  '			<li>'
+  '				<a href="membership.html" class="submenu" id="Membership">Membership</a>'
+  '				<ul>'
+  '					<li><a href="membership.html#benefits">Benefits</a></li>'
+  '					<li><a href="membership.html#events">Events</a></li>'
+  '					<li><a href="membership.html#lockers">Lockers</a></li>'
+  '				</ul>'
+  '			</li>'
+  '			<li><a href="faq.html">FAQ</a></li>'
+  '			<li><a href="events.html" id="Events">Events</a></li>'
+  '			<li><a href="http://projects.texasacm.org" id="Projects">Projects</a></li>'
+  '			<li>'
+  '				<a href="corporate.html" class="submenu" id="Corporate">Corporate</a>'
+  '				<ul>'
+  '					<li><a href="corporate.html#sponsor-packages">Packages</a></li>'
+  '					<li><a href="corporate.html#sponsors">Sponsors</a></li>'
+  '				</ul>'
+  '			</li>'
+  '			<li>'
+  '				<a href="forms.html" class="submenu" id="Forms">Forms</a>'
+  '				<ul id="navForms">'
+  '					<li><a href="forms.html?Signin">Sign In</a></li>'
+  '					<li><a href="forms.html?Join">Join ACM</a></li>'
+  '					<li><a href="forms.html?Pc">Prog Comp</a></li>'
+  '					<li><a href="forms.html?Complaint">HR Complaint</a></li>'
+  '				</ul>'
+  '			</li>'
+  '		</ul>'
+  '	</nav>';
document.getElementById("header").innerHTML = header;

var topLevelNavLinkIds = ["Home", "About", "Membership", "Projects", "Events", "Corporate", "Forms"];
for (index = 0; index < topLevelNavLinkIds.length; index++) {
	if (document.title.includes(topLevelNavLinkIds[index])) {
		document.getElementById(topLevelNavLinkIds[index]).classList.add("active");
		break;
	}
}