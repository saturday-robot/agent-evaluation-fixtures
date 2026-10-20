-- 20 synthetic purchase requests. Fictional people and items only.
-- Keep in sync with src/lib/seed.ts.
insert into public.purchase_requests (requester, department, item, amount, approver, status, created_at) values
  ('Avery Lin','Engineering','Mechanical keyboards (x4)',520,'Morgan Reyes','pending','2026-09-01'),
  ('Jordan Park','Marketing','Conference booth banner',1250,'Casey Doyle','approved','2026-09-02'),
  ('Riley Chen','Design','Drawing tablet',389.99,'Morgan Reyes','pending','2026-09-03'),
  ('Sam Patel','Operations','Office chairs (x6)',2100,'Taylor Brooks','rejected','2026-09-04'),
  ('Quinn Alvarez','Engineering','Cloud credits top-up',3000,'Morgan Reyes','approved','2026-09-05'),
  ('Drew Kim','Sales','CRM add-on licenses',840,'Casey Doyle','pending','2026-09-06'),
  ('Harper Nguyen','Finance','Accounting reference books',145.50,'Taylor Brooks','approved','2026-09-07'),
  ('Rowan Silva','Engineering','4K monitors (x2)',798,'Morgan Reyes','pending','2026-09-08'),
  ('Emerson Ito','People','Team offsite catering',1600,'Taylor Brooks','pending','2026-09-09'),
  ('Skyler Moss','Marketing','Stock photo subscription',299,'Casey Doyle','rejected','2026-09-10'),
  ('Parker Diaz','Design','Font license',420,'Morgan Reyes','approved','2026-09-11'),
  ('Reese Okafor','Operations','Label printer',189,'Taylor Brooks','approved','2026-09-12'),
  ('Finley Ross','Sales','Demo laptop',1450,'Casey Doyle','pending','2026-09-13'),
  ('Hayden Cruz','Engineering','USB-C docks (x5)',625,'Morgan Reyes','rejected','2026-09-14'),
  ('Logan Weiss','Finance','Shredder',230,'Taylor Brooks','pending','2026-09-15'),
  ('Kendall Shah','People','Onboarding swag kits',900,'Taylor Brooks','approved','2026-09-16'),
  ('Blake Ortiz','Marketing','Video editing software',599,'Casey Doyle','pending','2026-09-17'),
  ('Cameron Wu','Engineering','Test devices (phones)',2400,'Morgan Reyes','pending','2026-09-18'),
  ('Dakota Hale','Design','Usability testing panel',750,'Morgan Reyes','approved','2026-09-19'),
  ('Jamie Fox','Operations','Whiteboards (x3)',360,'Taylor Brooks','rejected','2026-09-20');
