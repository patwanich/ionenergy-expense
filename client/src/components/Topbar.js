import { useTheme } from "@mui/material";

const Topbar = ({ Left, Middle, Right }) => {
  const theme = useTheme();

  return (
    <div
      style={{
        zIndex: "1",
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "60px",
        background: theme.palette.primary.main,
        display: "flex",
        alignItems: "center",
        paddingInline: "1rem",
        justifyContent: "space-between",
        color: theme.palette.primary.contrastText,
      }}>
      {Left}
      {Middle}
      {Right}
    </div>
  );
};
export default Topbar;
