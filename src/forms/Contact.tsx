"use client";
import { Button, Grid, TextField, Typography } from "@mui/material";
import { contactFormData } from "../data/data";
import SendIcon from "@mui/icons-material/Send";
import { FormEvent, useRef } from "react";
import emailjs from "@emailjs/browser";
import { handleError, handleSuccess } from "../utils/utils";
import { useSelector } from "react-redux";
import { contactUser } from "../data/types";
import { RootState } from "@/components/Providers";

const ContactForm = () => {
  const form = useRef<HTMLFormElement>(null);
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  ) as { isAuthenticated: boolean; user: contactUser | null };

  const isValidField = (field: string): field is keyof contactUser =>
    user !== null && field in user;

  const sendEmail = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.current) return;

    emailjs
      .sendForm("service_mxzjcq2", "template_t3vxl2n", form.current, {
        publicKey: "DvAb6YOP1k4gB4O1R",
      })
      .then(
        () => {
          handleSuccess("Mail Sent successfully.");
          form.current?.reset();
        },
        (error) => {
          handleError(`Failed: ${error.text}`);
        }
      );
  };
  return (
    <form ref={form} onSubmit={sendEmail}>
      <Grid container spacing={3}>
        <Grid size={12}>
          <Typography
            variant="h5"
            component="h2"
            gutterBottom
            sx={{ fontWeight: 600, color: "#252b42" }}
          >
            Send Us A Message
          </Typography>
        </Grid>
        {contactFormData.map((contact) => (
          <Grid size={{ xs: 12, sm: 6 }} key={contact.field}>
            <TextField
              value={
                isAuthenticated && user && isValidField(contact.field)
                  ? user[contact.field as keyof contactUser] ?? ""
                  : ""
              }
              fullWidth
              label={contact.label}
              name={contact.field}
              variant="outlined"
              required
            />
          </Grid>
        ))}
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Phone Number"
            name="phone"
            variant="outlined"
            required
          />
        </Grid>
        <Grid size={{ xs: 12, sm: 6 }}>
          <TextField
            fullWidth
            label="Subject"
            name="subject"
            variant="outlined"
            required
          />
        </Grid>
        <Grid size={12}>
          <TextField
            fullWidth
            label="Your Message"
            name="message"
            multiline
            rows={4}
            variant="outlined"
            required
          />
        </Grid>
        <Grid size={12}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            endIcon={<SendIcon />}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: 2,
              background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
              boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
              "&:hover": {
                background: "linear-gradient(45deg, #1976D2 30%, #2196F3 90%)",
              },
            }}
          >
            Send Message
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default ContactForm;
