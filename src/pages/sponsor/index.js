import React from 'react';
import { TitleContainer, LayoutContainer, ProjectsContainer, LinkStyled } from '../../styles/sponsors/styles';
import {
  Grid,
  Typography,
  Paper,
  Avatar,
  Chip,
  Box,
  Tooltip,
  IconButton,
  CardActions,
  useTheme,
  useMediaQuery,
  CardMedia,
} from "@mui/material";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";

import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import LinkIcon from "@mui/icons-material/Link";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import SponsorshipSlider from '../../components/Hackathon/SponsorshipSlider';
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import { styled } from '@mui/system';

const getContactLink = () => 'https://forms.gle/giowXMQ4h8h6XwVF8';

const sponsors = [
  { name: "Meta", logo: "https://i.imgur.com/v1qjSIO.png", hours: 150, donations: 1000, website: "https://meta.com" },
  { name: "Spotify", logo: "https://i.imgur.com/r9qB2L4.png", hours: 150, donations: 0, website: "https://spotify.com" }
];

const calculateSupport = (hours, donations) => hours * 100 + donations;

const benefitsData = [
  { benefit: 'Logo on website', innovator: '3 months', changemaker: '6 months', transformer: '1 year', visionary: '2 years' },
  { benefit: 'Social media promotion', innovator: '1 post', changemaker: '2 posts', transformer: '4 posts', visionary: '6 posts' },
  { benefit: 'Booth at Sponsor Fair', innovator: '-', changemaker: 'Yes', transformer: 'Yes', visionary: 'Yes' },
  { benefit: 'Opening/Closing Ceremony', innovator: '-', changemaker: '1 min', transformer: '2 min', visionary: '5 min' },
  { benefit: 'Judging panel seats', innovator: '1', changemaker: '1', transformer: '2', visionary: '3', 
    button: <Button variant="outlined" size="small" href="/about/judges">Learn More</Button> },
  { benefit: 'Mentorship opportunities', innovator: 'Unlimited', changemaker: 'Unlimited', transformer: 'Unlimited', visionary: 'Unlimited', 
    button: <Button variant="outlined" size="small" href="/about/mentors">Learn More</Button> },
  { benefit: 'Branded prize category', innovator: '-', changemaker: '-', transformer: '1', visionary: '2' },
  { benefit: 'Logo on event t-shirts', innovator: 'Small', changemaker: 'Medium', transformer: 'Large', visionary: 'Premium' },
  { benefit: 'Access to participant resumes', innovator: '-', changemaker: '-', transformer: 'Yes', visionary: 'Yes' },
  { benefit: 'Sponsored workshop/tech talk', innovator: '-', changemaker: '-', transformer: '30 min', visionary: '1 hour' },
  { benefit: 'Recruiting/interviews', innovator: '-', changemaker: 'Post-event', transformer: 'During & post', visionary: 'Pre, during & post' },    
];

const sponsorLevels = [
  { name: 'Innovator', color: '#C8E6C9', minSupport: 1000, minHours: 20 },
  { name: 'Changemaker', color: '#BBDEFB', minSupport: 2500, minHours: 50 },
  { name: 'Transformer', color: '#FFECB3', minSupport: 5000, minHours: 100 },
  { name: 'Visionary', color: '#E1BEE7', minSupport: 10000, minHours: 200 },
];

export default function SponsorIndexList() {  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const mobileStyle = { fontSize: '12px' };
  const desktopStyle = { fontSize: '14px' };
  const style = isMobile ? mobileStyle : desktopStyle;

  const tableHeaderStyle = { 
    fontSize: isMobile ? '12px' : '14px', 
    fontWeight: 'bold', 
    backgroundColor: '#f0f0f0' 
  };
  // The sponsor boxes that display a sponsor
  const SponsorCard = ({ sponsor, level }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

    return (
      <Paper
        elevation={3}
        sx={{
          p: 2,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          gap: 2,
          backgroundColor: level.color,
          transition: "transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 6,
          },
        }}
      >
        <Avatar
          src={sponsor.logo}
          alt={sponsor.name}
          sx={{ width: 80, height: 80, objectFit: "contain", bgcolor: "white" }}
          variant="rounded"
        />
        <Box
          sx={{ flexGrow: 1, display: "flex", flexDirection: "column", gap: 1 }}
        >
          <Typography variant="h6" noWrap>
            {sponsor.name}
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
            <Chip
              icon={<AccessTimeIcon />}
              label={`${sponsor.hours} hours`}
              size="small"
              color="primary"
            />
            {sponsor.donations > 0 && (
              <Chip
                icon={<AttachMoneyIcon />}
                label={`$${sponsor.donations} donated`}
                size="small"
                color="secondary"
              />
            )}
          </Box>
        </Box>
        <Tooltip title="Visit sponsor website">
          <IconButton
            aria-label="sponsor website"
            onClick={() => window.open(sponsor.website, "_blank")}
          >
            <LinkIcon />
          </IconButton>
        </Tooltip>
      </Paper>
    );
  };
  // get list of sponsors
  const getSponsorCard = (level, nextLevelMinSupport) => {
    const levelSponsors = sponsors.filter((s) => {
      const totalSupport = calculateSupport(s.hours, s.donations);
      return (
        totalSupport >= level.minSupport &&
        (nextLevelMinSupport ? totalSupport < nextLevelMinSupport : true)
      );
    });

    return (
      <Grid container spacing={isMobile ? 2 : 3}>
        {levelSponsors.length > 0 ? (
          levelSponsors.map((sponsor) => (
            <Grid item key={sponsor.name} xs={12}>
              <SponsorCard sponsor={sponsor} level={level} />
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Paper
              sx={{
                p: 3,
                textAlign: "center",
                bgcolor: "#EEEEEE",
                borderStyle: "dashed",
                borderColor: "grey.400",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Be the first {level.name} sponsor!
              </Typography>
              <Typography variant="body2" paragraph>
                Support our mission by volunteering your time or making a
                donation.
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Chip
                  label="Become a Mentor"
                  component="a"
                  href="/about/mentors"
                  clickable
                />
                <Chip
                  label="Become a Judge"
                  component="a"
                  href="/about/judges"
                  clickable
                />
                <Chip
                  label="Contact Us to Sponsor"
                  component="a"
                  href={getContactLink()}
                  clickable
                  color="primary"
                />
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    );
  };
  const [anchor, setAnchor] = React.useState(null);

  const handleClick = (event) => {
    setAnchor(anchor ? null : event.currentTarget);
  };

  React.useEffect(() => {
    const handleOutsideClick = (event) => {
      if (anchor && !anchor.contains(event.currentTarget) && event.currentTarget.getAttribute(id) !== "button_mentor" && event.currentTarget.getAttribute(id) !== "button_judge") {
        setAnchor(null);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick); 
    };
  }, [anchor, setAnchor]);

  const open = Boolean(anchor);
  const id = open ? 'simple-popper' : undefined;
  
  const PopupBody = styled('div')(
    ({ theme }) => `
    width: max-content;
    padding: 12px 16px;
    margin: 8px;
    border-radius: 8px;
    background-color: #FFFFFF;
    box-shadow: 0px 2px 5px 0px rgba(0, 0, 0, 0.2);
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    z-index: 1;
  `,
  );

  return (
    <LayoutContainer maxWidth="lg">
      <Head>
        <title>
          Sponsor Opportunity Hack | Transform Tech Talent and Communities
        </title>
        <meta
          name="description"
          content="Power innovation and social impact by sponsoring Opportunity Hack. Connect with top tech talent, showcase your brand, and drive meaningful change through technology."
        />
        <meta
          name="keywords"
          content="Opportunity Hack, hackathon sponsorship, tech for good, corporate social responsibility, nonprofit tech solutions"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.ohack.dev/sponsor" />
        <meta
          property="og:title"
          content="Sponsor Opportunity Hack | Transform Tech Talent and Communities"
        />
        <meta
          property="og:description"
          content="Power innovation and social impact by sponsoring Opportunity Hack. Connect with top tech talent, showcase your brand, and drive meaningful change through technology."
        />
        <meta
          property="og:image"
          content="https://cdn.ohack.dev/ohack.dev/2023_hackathon_4.webp"
        />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.ohack.dev/sponsor" />
        <meta
          property="twitter:title"
          content="Sponsor Opportunity Hack | Transform Tech Talent and Communities"
        />
        <meta
          property="twitter:description"
          content="Power innovation and social impact by sponsoring Opportunity Hack. Connect with top tech talent, showcase your brand, and drive meaningful change through technology."
        />
        <meta
          property="twitter:image"
          content="https://cdn.ohack.dev/ohack.dev/2023_hackathon_4.webp"
        />
        <link rel="canonical" href="https://www.ohack.dev/sponsor" />
        <meta name="robots" content="index, follow" />
      </Head>
      <TitleContainer
        style={{textAlign: 'center'}}
        // sx={{
        //   backgroundImage:`url("https://cdn.ohack.dev/ohack.dev/2023_hackathon_4.webp")`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundSize: "cover", opacity:"0.8"}}
      >
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          style={isMobile ? { fontSize: "2rem" } : {}}
        >
          <strong>Sponsor Opportunity Hack</strong>
        </Typography>
        <Typography variant="h5" component="h2" paragraph style={style}>
          Empower Nonprofits Through Technology
        </Typography>
        <Typography variant="body1" paragraph style={style}>
          Join us in fostering innovation for social good. Your sponsorship
          fuels creativity, supports nonprofits, and connects you with
          passionate tech talent dedicated to making a difference.
        </Typography>

        <Typography variant="h5" gutterBottom>
          <strong>Join us in empowering nonprofits through technology</strong>
        </Typography>
        <Box 
          sx = {{flexDirection : "row"}}>
          <Button
            variant="contained"
            color="primary"
            size={isMobile ? "medium" : "large"}
            href={getContactLink()}
            style={{margin:"20px"}}
          >
            Sponsor as a Corporate
          </Button>
          <Button
            variant="contained"
            color="secondary"
            size={isMobile ? "medium" : "large"}
            // href={getContactLink()}
            style={{margin:"20px"}}
            aria-describedby={id} 
            type="button" 
            onClick={handleClick}
          >
            Sponsor as an Individual
          </Button>
          <BasePopup id={id} open={open} anchor={anchor} placement="right" align="center">
            <PopupBody>
              <Typography variant="body1" align="center" style={{ marginTop: "1rem", width:"250px"}}>
                For more information on what we are looking for, 
                please click the below button.
              </Typography>
              <Grid flexDirection="row">
                <Button
                  variant="contained"
                  color="secondary"
                  size={isMobile ? "medium" : "large"}
                  href="/about/mentors"
                  style={{margin:"20px"}}
                  id = "button_mentor"
                >
                  Become a Mentor
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  size={isMobile ? "medium" : "large"}
                  href="/about/judges"
                  style={{margin:"20px"}}
                  id = "button_judge"
                >
                  Become a Judge
                </Button>
              </Grid>
            </PopupBody>
          </BasePopup>
        </Box>
        <Typography variant="body1" style={{ marginTop: "1rem" }}>
          Limited sponsorship spots available!
        </Typography>
      </TitleContainer>
      {/*  banner section end---------------------------------------------------------- */}

      {/* Beginning of About----------------------------------------------------------------------------*/}
      <ProjectsContainer>
        <Box mb={isMobile ? 3 : 6}>
          <Grid container spacing={isMobile ? 2 : 3}>
            <Grid item xs={12} md={6}>
              <Typography
              variant="h2"
              component="h2"
              gutterBottom
              style={isMobile ? { fontSize: "1.75rem" } : {}}
              marginTop="50px"
              >
                About Opportunity Hack
              </Typography>
              <Typography variant="body1" paragraph style={style}>
                Opportunity Hack is a premier hackathon that brings together
                talented students and professionals to create innovative
                solutions for nonprofits. Our most recent event was held on
                October 7-8, 2023, both in-person at ASU Tempe and online
                globally.
                <br />
                <Link
                  href="/hack/2023_fall"
                  style={{ color: "blue", textDecoration: "underline" }}
                >
                  Learn more about our 2023 Fall Hackathon
                </Link>
              </Typography>
              <Typography variant="body1" paragraph style={style}>
                <strong>Key Statistics:</strong>
                <ul>
                  <li>Over 300 participants</li>
                  <li>25 projects submitted</li>
                  <li>Local Arizona judges and online judges</li>
                  <li>
                    Top 3 teams won cash prizes and follow-up project
                    opportunities
                  </li>
                </ul>
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  height: isMobile ? "200px" : "300px",
                }}
                marginTop="50px"
              >
                <Image
                  src="https://cdn.ohack.dev/ohack.dev/2023_hackathon_4.webp"
                  alt="Opportunity Hack 2023 Participants"
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
              <Typography variant="caption" align="center" style={style}>
                Opportunity Hack 2023 participants actively engage with Diana
                Lee Guzman from{" "}
                <Link
                  href="https://codingincolor.net/"
                  style={{ color: "blue", textDecoration: "underline" }}
                  target="_blank"
                  rel="noopener noreferrer"
                  passHref
                >
                  Coding In Color
                </Link>
                , fostering diversity and inclusion in tech
              </Typography>
            </Grid>
          </Grid>
        </Box>
        {/* End of About----------------------------------------------------------------------------*/}
        
        {/* Beginning of Mentors----------------------------------------------------------------------------*/}
        <Box mb={isMobile ? 3 : 6}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            style={isMobile ? { fontSize: "1.75rem" } : {}}
          >
            Our Mentors
          </Typography>
          <Typography variant="body1" paragraph style={style}>
            Opportunity Hack attracts high-caliber mentors from leading tech
            companies and universities. In our 2023 event, we had over 30
            mentors, including professionals from:
          </Typography>
          <Grid container spacing={isMobile ? 1 : 2}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent sx={{backgroundColor: 'rgba(0, 156, 222, 0.15)'}}>
                  <Typography variant="h6" style={style}>
                    Tech Giants
                  </Typography>
                  <Typography variant="body2" style={style}>
                    Meta, Spotify, PayPal, eBay
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent sx={{backgroundColor: 'rgba(0, 156, 222, 0.15)'}}>
                  <Typography variant="h6" style={style}>
                    Innovative Companies
                  </Typography>
                  <Typography variant="body2" style={style}>
                    Honeywell, World Wide Technology, Pixee
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent sx={{backgroundColor: 'rgba(0, 156, 222, 0.15)'}}>
                  <Typography variant="h6" style={style}>
                    Academic Institutions
                  </Typography>
                  <Typography variant="body2" style={style}>
                    Arizona State University, Rutgers, University of Toronto
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          <Typography variant="body1" paragraph style={style} mt={2}>
            Our mentors bring expertise in various areas, including:
          </Typography>
          <ul style={style}>
            <li>Front-end and Back-end Development</li>
            <li>Mobile Development (iOS and Android)</li>
            <li>Data Science and Machine Learning</li>
            <li>Cloud Technologies (AWS, Google Cloud, Azure)</li>
            <li>UX/UI Design</li>
            <li>Product and Program Management</li>
            <li>DevOps and GitHub expertise</li>
          </ul>
          <Typography variant="body1" paragraph style={style}>
            As a sponsor, you'll have the opportunity to provide your own or
            interact with these mentors and the talented participants they
            guide, providing unique networking and recruitment opportunities.
          </Typography>
        </Box>
        {/* End of Mentors Section----------------------------------------------------------------------------*/}
        <Box mt={isMobile ? 3 : 6}>
          <Typography
            variant="h3"
            component="h3"
            gutterBottom
            style={isMobile ? { fontSize: "1.5rem" } : {}}
          >
            Why Sponsor Opportunity Hack?
          </Typography>
          <Grid container spacing={isMobile ? 2 : 2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{backgroundColor: 'rgba(0, 48, 135, 0.2)', padding:'15px' }} borderRadius={4}>
                <Typography
                  variant="h5"
                  component="h4"
                  gutterBottom
                  style={style}
                >
                  Drive Social Innovation
                </Typography><Typography variant="body1" paragraph style={style}>
                    Your support enables tech solutions that address real challenges
                    faced by nonprofits, amplifying their impact in communities.
                  </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{backgroundColor: 'rgba(0, 48, 135, 0.2)', padding:'15px' }} borderRadius={4}>
                <Typography
                  variant="h5"
                  component="h4"
                  gutterBottom
                  style={style}
                >
                  Engage with Passionate Talent
                </Typography>
                <Typography variant="body1" paragraph style={style}>
                  Connect with skilled developers and innovators who are committed
                  to using technology for social good.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{backgroundColor: 'rgba(0, 48, 135, 0.2)', padding:'15px' }} borderRadius={4}>
                <Typography
                  variant="h5"
                  component="h4"
                  gutterBottom
                  style={style}
                >
                  Showcase Corporate Social Responsibility
                </Typography>
                <Typography variant="body1" paragraph style={style}>
                  Demonstrate your company's commitment to social causes and
                  technology-driven solutions for nonprofits.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Box sx={{backgroundColor: 'rgba(0, 48, 135, 0.2)', padding:'15px' }} borderRadius={4}>
                <Typography
                  variant="h5"
                  component="h4"
                  gutterBottom
                  style={style}
                >
                  Foster Community Partnerships
                </Typography>
                <Typography variant="body1" paragraph style={style}>
                  Build relationships with nonprofits, tech communities, and
                  socially-conscious individuals passionate about creating change.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {/* End of Why----------------------------------------------------------------------------*/}

        {/* Beginning of Success Stories----------------------------------------------------------------------------*/}
        <Box mt={isMobile ? 3 : 6} mb={8}>
          <Typography
            variant="h3"
            component="h3"
            gutterBottom
            style={isMobile ? { fontSize: "1.5rem" } : {}}
          >
            Success Stories
          </Typography>
          <Typography variant="body1" paragraph style={style}>
            Our hackathons have led to impactful solutions for nonprofits. See
            how your sponsorship can make a real difference:
          </Typography>
          <Grid container spacing={isMobile ? 2 : 3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  image="https://cdn.ohack.dev/nonprofit_images/matthews_crossing.webp"
                  alt="Matthews Crossing Food Bank"
                  layout="fill"
                  objectFit="cover"
                  height="250"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h4"
                    gutterBottom
                    style={style}
                  >
                    <strong>Matthews Crossing Food Bank</strong>
                  </Typography>
                
                  <Typography variant="body2" paragraph style={style}>
                    Streamlined donation tracking system, saving hundreds of
                    volunteer hours annually.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    href="/about/success-stories#matthews-crossing"
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  image="https://cdn.ohack.dev/nonprofit_images/Zuris_Circle_2019.webp"
                  alt="Zuri's Circle"
                  layout="fill"
                  objectFit="cover"
                  height="250"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h4"
                    gutterBottom
                    style={style}
                  >
                    <strong>Zuri's Circle</strong>
                  </Typography>
                  <Typography variant="body2" paragraph style={style}>
                    Developed an event management system, increasing volunteer
                    engagement by 40%.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    href="/about/success-stories#zuris-circle"
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  image="https://cdn.ohack.dev/nonprofit_images/vidyodaya.webp"
                  alt="Vidyodaya"
                  layout="fill"
                  objectFit="cover"
                  height="250"
                />
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h4"
                    gutterBottom
                    style={style}
                  >
                    <strong>Vidyodaya</strong>
                  </Typography>
                  <Typography variant="body2" paragraph style={style}>
                    Created a modern, user-friendly website, boosting online
                    visibility and donations.
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    component={Link}
                    href="/about/success-stories#vidyodaya"
                  >
                    Read More
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
          <Box mt={2} textAlign="center">
            <Button
              variant="contained"
              color="secondary"
              size={isMobile ? "medium" : "large"}
              component={Link}
              href="/about/success-stories"
            >
              Explore All Success Stories
            </Button>
          </Box>
        </Box>
        {/* End of Success Story----------------------------------------------------------------------------*/}

        {/* Beginning of Sponsor Level Display----------------------------------------------------------------------------*/}
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          style={isMobile ? { fontSize: "1.75rem" } : {}}
        >
          Sponsorship Levels & Benefits
        </Typography>
        <Grid container spacing={isMobile ? 2 : 3}>
          {sponsorLevels.map((level, index) => (
            <Grid item xs={12} sm={6} md={3} key={level.name}>
              <Card sx={{ height: "100%", backgroundColor: level.color }}>
                <CardContent>
                  <Typography
                    variant="h4"
                    component="h3"
                    gutterBottom
                    style={isMobile ? { fontSize: "1.5rem" } : {}}
                  >
                    {level.name}
                  </Typography>
                  <Typography variant="body1" paragraph style={style}>
                    ${level.minSupport}+ in support or equivalent volunteer
                    hours
                  </Typography>
                  <Typography variant="h6" component="h4" style={style}>
                    Current Sponsors
                  </Typography>
                  {getSponsorCard(level, sponsorLevels[index + 1]?.minSupport)}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        {/* End of Sponsor Level Display----------------------------------------------------------------------------*/}

        {/* Beginning of Benefit Calculator----------------------------------------------------------------------------*/}
        <Box mt={isMobile ? 2 : 3} mb={isMobile ? 3 : 6}>
          <Typography
            variant="h2"
            component="h2"
            gutterBottom
            style={isMobile ? { fontSize: "1.75rem" } : {}}
          >
            Calculate Your Sponsorship
          </Typography>
          <SponsorshipSlider
            sponsorLevels={sponsorLevels}
            isMobile={isMobile}
          />
        </Box>
        {/* End of Benefit Calculator----------------------------------------------------------------------------*/}
        <Box mt={isMobile ? 3 : 6}>
          <Typography
            variant="h3"
            component="h3"
            gutterBottom
            style={isMobile ? { fontSize: "1.5rem" } : {}}
          >
            Sponsorship Benefits
          </Typography>
          <TableContainer component={Paper}>
            <Table
              aria-label="sponsorship benefits table"
              size={isMobile ? "small" : "medium"}
            >
              <TableHead>
                <TableRow>
                  <TableCell style={tableHeaderStyle}>Benefit</TableCell>
                  {sponsorLevels.map((level) => (
                    <TableCell
                      key={level.name}
                      align="center"
                      style={{
                        ...tableHeaderStyle,
                        backgroundColor: level.color,
                        color: "black",
                      }}
                    >
                      {level.name}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {benefitsData.map((row) => (
                  <TableRow key={row.benefit}>
                    <TableCell component="th" scope="row" style={style}>
                      {row.benefit}
                      {row.button && <Box mt={1}>{row.button}</Box>}
                    </TableCell>
                    <TableCell align="center" style={style}>
                      {row.innovator}
                    </TableCell>
                    <TableCell align="center" style={style}>
                      {row.changemaker}
                    </TableCell>
                    <TableCell align="center" style={style}>
                      {row.transformer}
                    </TableCell>
                    <TableCell align="center" style={style}>
                      {row.visionary}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        {/* End of Benefit Table----------------------------------------------------------------------------*/}

        {/* Beginning of Engagement Opportunities----------------------------------------------------------------------------*/}
        <Box mt={isMobile ? 3 : 6}>
          <Typography
            variant="h3"
            component="h3"
            gutterBottom
            style={isMobile ? { fontSize: "1.5rem" } : {}}
          >
            Engagement Opportunities
          </Typography>
          <Grid container spacing={isMobile ? 2 : 3}>
            <Grid item xs={12} sm={6} md={4}>
              <Card style={{height:130}} sx={{backgroundColor: 'rgba(0, 48, 135, 0.2)'}} borderRadius={4}>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h4"
                    gutterBottom
                    style={style}
                  >
                    Sponsor Fair
                  </Typography>
                  <Typography variant="body1" paragraph style={style}>
                    Showcase your brand and interact directly with participants
                    at our dedicated Sponsor Fair.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card style={{height:130}} sx={{backgroundColor: 'rgba(0, 48, 135, 0.2)'}} borderRadius={4}>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h4"
                    gutterBottom
                    style={style}
                  >
                    Tech Talks & Workshops
                  </Typography>
                  <Typography variant="body1" paragraph style={style}>
                    Present your latest technologies and share your expertise
                    through engaging tech talks and hands-on workshops.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card style={{height:130}} sx={{backgroundColor: 'rgba(0, 48, 135, 0.2)' }} borderRadius={4}>
                <CardContent>
                  <Typography
                    variant="h5"
                    component="h4"
                    gutterBottom
                    style={style}
                  >
                    Branded Challenges
                  </Typography>
                  <Typography variant="body1" paragraph style={style}>
                    Create a custom challenge for participants using your
                    technologies, with dedicated prizes for the best solutions.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
        {/* End of Engagement Opportunity----------------------------------------------------------------------------*/}
        <Box mt={isMobile ? 3 : 6} textAlign="center">
          <Typography
            variant="h3"
            component="h3"
            gutterBottom
            style={isMobile ? { fontSize: "1.5rem" } : {}}
          >
            Ready to Make a Difference?
          </Typography>
          <Typography variant="body1" paragraph style={style}>
            Your sponsorship can change lives and empower nonprofits through
            innovative tech solutions. Join us in creating lasting impact!
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size={isMobile ? "medium" : "large"}
            target="_blank"
            href={getContactLink()}
          >
            Contact Us About Sponsorship
          </Button>
        </Box>
      </ProjectsContainer>
    </LayoutContainer>
  );
}