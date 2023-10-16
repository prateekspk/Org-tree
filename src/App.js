import React from "react";
import { Tree, TreeNode } from "react-organizational-chart";
import _ from "lodash";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import BusinessIcon from "@material-ui/icons/Business";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Badge from "@material-ui/core/Badge";
import Tooltip from "@material-ui/core/Tooltip";
import organization from "./org.json";
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    background: "white",
    display: "inline-block",
    borderRadius: 16
  },
  expand: {
    transform: "rotate(0deg)",
    marginTop: -10,
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.short
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: "#ECECF4"
  }
}));

function Organization({ org, onCollapse, collapsed }) {
  const classes = useStyles();
  let backgroundColor = "white";
  return (
    <Card
      variant="outlined"
      className={classes.root}
      style={{ backgroundColor }}
    >
      <CardHeader
        avatar={
          <Badge
            style={{ cursor: "pointer" }}
            color="secondary"
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right"
            }}
            showZero
            overlap="circle"
            badgeContent={org.PrCount}
            onClick={onCollapse}
          >
            <Avatar className={classes.avatar}>
              <BusinessIcon color="primary" />
            </Avatar>
          </Badge>
        }
        title={org.name}
      />

      <IconButton
        size="small"
        onClick={onCollapse}
        className={clsx(classes.expand, {
          [classes.expandOpen]: !collapsed
        })}
      >
        <ExpandMoreIcon />
      </IconButton>
    </Card>
  );
}

function Node({ o, parent }) {
  const [collapsed, setCollapsed] = React.useState(o.collapsed);
  const handleCollapse = () => {
    setCollapsed(!collapsed);
  };
  React.useEffect(() => {
    o.collapsed = collapsed;
  });
  const T = parent
    ? TreeNode
    : (props) => (
        <Tree
          {...props}
          lineWidth={"2px"}
          lineColor={"#bbc"}
          lineBorderRadius={"12px"}
        >
          {props.children}
        </Tree>
      );
  return collapsed ? (
    <T
      label={
        <Organization
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
        />
      }
    />
  ) : (
    <T
      label={
        <Organization
          org={o}
          onCollapse={handleCollapse}
          collapsed={collapsed}
        />
      }
    >
      {_.map(o.children, (c) => (
        <Node o={c} parent={o} />
      ))}
    </T>
  );
}
const theme = createMuiTheme({
  palette: {
    background: "#ECECF4"
  },
  fontFamily: "Roboto, sans-serif"
});

export default function App(props) {
  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="background" padding={4} height="80vh">
        <Node o={organization} />
      </Box>
    </ThemeProvider>
  );
}
