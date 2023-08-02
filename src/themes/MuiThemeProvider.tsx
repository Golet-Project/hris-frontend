import { createTheme } from "@mui/material"
import { outlinedInputClasses } from "@mui/material/OutlinedInput"
import { buttonClasses } from "@mui/material/Button"
import { buttonBaseClasses } from "@mui/material/ButtonBase"

export const MuiThemeProvider = createTheme({
  palette: {
    primary: {
      main: "#00B4BD"
    }
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "--TextField-brandBorderColor": "#E0E3E7",
          "--TextField-brandBorderHoverColor": "#B2BAC2",
          "--TextField-brandBorderFocusedColor": "#00B4BD"
        }
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // notchedOutline: {
        //   borderColor: "var(--TextField-brandBorderColor)"
        // },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderHoverColor)"
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "var(--TextField-brandBorderFocusedColor)"
          }
        }
      }
    },
    // MuiButtonBase: {
    //   styleOverrides: {
    //     root: {
    //       "&:hover": {
    //         backgroundColor: "purple"
    //       }
    //     }
    //   }
    // },
    MuiButton: {
      styleOverrides: {
        contained: {
          color: "white"
        },
        containedPrimary: {
          "&:hover": {
            backgroundColor: "#00B4BD",
            opacity: "80%"
          }
        }
      }
    }
  }
})
