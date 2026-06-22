# New Chemical Request Process

Use this process for employees who need to request a new chemical without editing the SDS spreadsheet directly.

## Recommended Form Fields

```text
Location
Product
Reason
Requester
Notes
```

Keep the form short. The requester usually will not know the spreadsheet-specific SDS fields, so the form should only collect enough information for the correct location owner or supervisor to review the request.

## Power Automate Routing

Create a Microsoft Form, then use one Power Automate flow:

```text
When a new response is submitted
  -> Get response details
  -> Condition or Switch on Location
  -> Post message in a chat or channel
```

Route each location to the person or Teams channel responsible for that SDS spreadsheet.

## Teams Message Template

```text
Please add this product to the SDS spreadsheet:

Location: [Location]
Product: [Product]
Reason: [Reason]
Requester: [Requester]
Notes: [Notes]
```

The message is informational only. Do not add approve or deny buttons unless the workflow later needs formal tracking.
