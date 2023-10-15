rate = $Client2.Rate_per_Hour
lines = {}
for r in Time_Log.lookupRecords(Invoice=$id):
  lines.setdefault((r.Project, r.Date), []).append(r)
hours = {line: SUM(r.Duration_hrs_ for r in lines[line]) for line in lines}
items = []
for line in sorted(lines):
  desc = " / ".join(sorted(filter(None, set(r.Invoice_Description for r in lines[line]))))
  if desc:
    desc = ": " + desc
  items.append({
    "Description": "{} {}{}".format(line[1], line[0].Name, desc),
    "Price": rate,
    "Quantity": hours[line],
    "Total": hours[line] * rate,
  })
return items
