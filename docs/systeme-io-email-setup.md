# Systeme.io Email Automation Setup Guide

This document explains how to set up automated email sequences in Systeme.io for AquaEvents.club event notifications.

## Overview

The website uses Systeme.io API to add contacts and trigger email automations through tags. When specific actions occur on the website (event submission, approval, rejection), the system automatically adds tags to contacts in Systeme.io, which then trigger your pre-configured email sequences.

## API Integration

The Systeme.io API is already integrated in the backend at `server/_core/systemeio.ts`. The API key is stored in environment variables as `SYSTEME_API_KEY`.

### Available Functions

```typescript
// Add or update a contact with tags
await addContactWithTags({
  email: "user@example.com",
  firstName: "John",
  lastName: "Doe",
  tags: ["event-submitted"]
});
```

## Email Automation Tags

The system uses the following tags to trigger email automations:

### 1. `event-submitted`
**Trigger:** When a user submits a new event through the form at `/enviar-evento`

**Purpose:** Send confirmation email to the event submitter

**Recommended Email Content:**
- Subject: "¡Gracias por enviar tu evento a AquaEvents.club!"
- Thank the user for submitting their event
- Explain that the event is under review
- Provide estimated review time (e.g., "within 48 hours")
- Include contact information for questions

**Example Email Template:**
```
Hola [FirstName],

¡Gracias por enviar tu evento "[EventTitle]" a AquaEvents.club!

Hemos recibido tu solicitud y nuestro equipo la revisará en las próximas 48 horas. Te notificaremos por email cuando tu evento sea aprobado y publicado en nuestro calendario.

Detalles del evento enviado:
- Título: [EventTitle]
- Disciplina: [Discipline]
- Fecha: [EventDate]
- Ubicación: [City], [Region]

Si tienes alguna pregunta, no dudes en contactarnos.

¡Gracias por contribuir a la comunidad acuática española!

El equipo de AquaEvents.club
```

---

### 2. `event-approved`
**Trigger:** When an admin approves an event submission from the admin dashboard at `/admin`

**Purpose:** Notify the submitter that their event has been published

**Recommended Email Content:**
- Subject: "✅ Tu evento ha sido aprobado y publicado"
- Congratulate the user on approval
- Provide direct link to the published event
- Encourage them to share the event link
- Invite them to submit future events

**Example Email Template:**
```
¡Buenas noticias, [FirstName]!

Tu evento "[EventTitle]" ha sido aprobado y ya está publicado en AquaEvents.club.

Ver tu evento publicado: [EventURL]

Ahora miles de nadadores, clubes y aficionados a los deportes acuáticos podrán descubrir tu evento. Te animamos a compartir el enlace en tus redes sociales y con tu comunidad.

¿Organizas más eventos? No dudes en enviarlos a través de nuestra plataforma.

¡Gracias por confiar en AquaEvents.club!

El equipo de AquaEvents.club
```

---

### 3. `event-rejected`
**Trigger:** When an admin rejects an event submission from the admin dashboard

**Purpose:** Inform the submitter about rejection with explanation

**Recommended Email Content:**
- Subject: "Actualización sobre tu evento enviado"
- Politely explain that the event wasn't approved
- Provide reason for rejection (if applicable)
- Offer guidance on how to resubmit
- Maintain positive tone and encourage future submissions

**Example Email Template:**
```
Hola [FirstName],

Gracias por enviar tu evento "[EventTitle]" a AquaEvents.club.

Lamentablemente, no hemos podido aprobar este evento en esta ocasión. Esto puede deberse a:
- El evento no cumple con nuestros criterios de deportes acuáticos
- Falta información importante del evento
- El evento ya ha pasado o está duplicado

Si crees que ha habido un error o deseas más información, por favor responde a este email y estaremos encantados de ayudarte.

Puedes enviar nuevos eventos en cualquier momento a través de nuestra plataforma.

Gracias por tu comprensión.

El equipo de AquaEvents.club
```

---

### 4. `new-event-alert`
**Trigger:** When new events matching user preferences are added (future feature - requires scheduled job)

**Purpose:** Weekly/monthly digest of new events matching user's preferred disciplines

**Recommended Email Content:**
- Subject: "Nuevos eventos de [Discipline] en tu zona"
- List new events matching user preferences
- Include event dates, locations, and links
- Personalize based on user's selected disciplines
- Include unsubscribe option

**Example Email Template:**
```
Hola [FirstName],

Hemos añadido nuevos eventos de [PreferredDisciplines] que podrían interesarte:

🏊 [Event 1 Title]
📅 [Date] | 📍 [Location]
[Ver detalles]

🏊 [Event 2 Title]
📅 [Date] | 📍 [Location]
[Ver detalles]

🏊 [Event 3 Title]
📅 [Date] | 📍 [Location]
[Ver detalles]

Ver todos los eventos: https://aquaevents.club/eventos

¿No quieres recibir estas notificaciones? [Gestionar preferencias]

¡Nos vemos en el agua!
El equipo de AquaEvents.club
```

---

## Setting Up Automations in Systeme.io

### Step 1: Access Automations
1. Log in to your Systeme.io account
2. Go to **Automations** in the left sidebar
3. Click **Create** to create a new automation

### Step 2: Configure Trigger
1. Select trigger: **Tag added**
2. Choose the tag (e.g., `event-submitted`)
3. Set the automation name (e.g., "Event Submission Confirmation")

### Step 3: Add Email Step
1. Click **Add step** → **Send email**
2. Create your email template using the examples above
3. Use merge tags for personalization:
   - `{contact.first_name}` - User's first name
   - `{contact.last_name}` - User's last name
   - `{contact.email}` - User's email
   - Custom fields can be added for event details

### Step 4: Activate Automation
1. Review your automation flow
2. Click **Activate** to enable the automation
3. Test by manually adding the tag to a test contact

---

## Testing the Integration

### Test Event Submission Flow:
1. Go to `/enviar-evento` on your website
2. Fill out the event submission form
3. Submit the form
4. Check Systeme.io contacts - the email should be added with `event-submitted` tag
5. Verify the confirmation email is sent

### Test Admin Approval Flow:
1. Log in as admin and go to `/admin`
2. Approve a pending event submission
3. Check Systeme.io - the contact should receive `event-approved` tag
4. Verify the approval email is sent

### Test Admin Rejection Flow:
1. Log in as admin and go to `/admin`
2. Reject a pending event submission
3. Check Systeme.io - the contact should receive `event-rejected` tag
4. Verify the rejection email is sent

---

## Custom Fields (Optional)

To include event-specific details in emails, you can create custom fields in Systeme.io:

1. Go to **Contacts** → **Custom Fields**
2. Create fields like:
   - `event_title` - Event name
   - `event_date` - Event date
   - `event_location` - City and region
   - `event_discipline` - Sport discipline
   - `event_url` - Link to published event

3. Update the `addContactWithTags` function in `server/_core/systemeio.ts` to include these custom fields

---

## Best Practices

1. **Test thoroughly** - Always test automations with test contacts before going live
2. **Personalize emails** - Use merge tags to address users by name
3. **Clear CTAs** - Include clear calls-to-action (view event, share, submit another)
4. **Mobile-friendly** - Ensure emails look good on mobile devices
5. **Unsubscribe option** - Always include an unsubscribe link
6. **Monitor metrics** - Track open rates, click rates, and unsubscribe rates
7. **A/B testing** - Test different subject lines and content to improve engagement

---

## Troubleshooting

### Emails not sending?
- Check that the automation is activated in Systeme.io
- Verify the tag name matches exactly (case-sensitive)
- Check Systeme.io logs for API errors
- Ensure the contact's email is valid

### Tags not being added?
- Check server logs for API errors
- Verify `SYSTEME_API_KEY` is correctly set in environment variables
- Test the API connection using the Systeme.io API documentation

### Duplicate emails?
- Check if the same tag is being added multiple times
- Review automation settings to ensure emails are sent only once per tag

---

## Future Enhancements

1. **Scheduled event digests** - Weekly/monthly emails with new events matching user preferences
2. **Event reminders** - Send reminders to users about favorited events
3. **Segmentation** - Create different email flows for clubs, swimmers, and federations
4. **Analytics** - Track which emails drive the most event views and registrations

---

## Support

For questions about Systeme.io setup or API integration:
- Systeme.io Help Center: https://help.systeme.io
- API Documentation: https://developer.systeme.io
- AquaEvents.club technical support: Contact the development team

---

**Last Updated:** November 2025
**Version:** 1.0

