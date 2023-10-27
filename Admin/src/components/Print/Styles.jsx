import { StyleSheet } from "@react-pdf/renderer";

export const styles = StyleSheet.create({
  page: {
    minHeight: "100% !important",
  },
  header: {
    display: "flex",
    overflow: "hidden",
    padding: "14px",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    backgroundColor: "#F3F4F6",
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    maxHeight: "140px",
  },
  headerLeft: {
    display: "flex",
    flexDirection: "row",
    order: -9999,
    justifyContent: "flex-start",
    alignSelf: "flex-start",
    width: "66.666667%",
  },
  // headerLeft Child
  headerLeftPict: {
    display: "none",
    padding: "8px",
    width: "80px",
    height: "80px",
    textAlign: "center",
    "@media (min-width: 640px)": { display: "flex" },
  },
  headerLeftText: {
    display: "flex",
    marginLeft: "16px",
    marginRight: "16px",
    flexDirection: "column",
    gap: "4px",
    alignItems: "flex-start",
    color: "#111827",
    textDecoration: "underline",
    textTransform: "capitalize",
    ":hover": { color: "#1F2937" },
  },
  headerRight: {
    display: "flex",
    flexDirection: "row",
    order: 9999,
    justifyContent: "flex-end",
    alignSelf: "flex-end",
    width: "33.333333%",
  },
});
