-- Replace this UUID with an actual instructor user id in your Supabase project.
-- update courses set owner_user_id = '<instructor-uuid>' where slug = 'montgomery-bus-boycott';

insert into achievements(key, title, description, icon, rule_config, xp_bonus)
values
  ('primary_source_analyst', 'Primary Source Analyst', 'Complete 3 primary source activities.', 'book-open', '{"type":"count_activity_type","activityType":"primary_source","threshold":3}'::jsonb, 50),
  ('community_strategist', 'Community Strategist', 'Complete the carpool simulation successfully.', 'users', '{"type":"simulation_success","activityType":"simulation_carpool"}'::jsonb, 75),
  ('civil_rights_historian', 'Civil Rights Historian', 'Complete all lessons in the Montgomery Bus Boycott course.', 'trophy', '{"type":"course_completion"}'::jsonb, 100)
on conflict (key) do nothing;

insert into courses (
  id,
  slug,
  title,
  description,
  owner_user_id,
  is_public,
  status,
  estimated_minutes
)
values (
  '11111111-1111-1111-1111-111111111111',
  'montgomery-bus-boycott',
  'Montgomery Bus Boycott',
  'Explore the organizing, resistance, and victory of the Montgomery Bus Boycott through timelines, sources, and simulations.',
  null,
  true,
  'published',
  180
)
on conflict (id) do update set
  slug = excluded.slug,
  title = excluded.title,
  description = excluded.description,
  is_public = excluded.is_public,
  status = excluded.status,
  estimated_minutes = excluded.estimated_minutes;

insert into modules(id, course_id, title, summary, position)
values
  ('21111111-1111-1111-1111-111111111111', '11111111-1111-1111-1111-111111111111', 'Module 1: Historical Context', 'Segregation laws and movement context before the boycott.', 1),
  ('22222222-2222-2222-2222-222222222222', '11111111-1111-1111-1111-111111111111', 'Module 2: Organizing the Boycott', 'Women-led organizing, logistics, and strategy.', 2),
  ('23333333-3333-3333-3333-333333333333', '11111111-1111-1111-1111-111111111111', 'Module 3: Resistance and Legacy', 'Legal struggle, victory, and lasting impact.', 3)
on conflict (id) do update set
  title = excluded.title,
  summary = excluded.summary,
  position = excluded.position;

insert into lessons(id, module_id, title, objective, estimated_minutes, position)
values
  ('31111111-1111-1111-1111-111111111111', '21111111-1111-1111-1111-111111111111', 'Segregation and Daily Life', 'Analyze how segregation structured daily transportation life in Montgomery.', 25, 1),
  ('32222222-2222-2222-2222-222222222222', '21111111-1111-1111-1111-111111111111', 'Spark of the Boycott', 'Understand the events leading to organized mass action.', 30, 2),
  ('33333333-3333-3333-3333-333333333333', '22222222-2222-2222-2222-222222222222', 'Women’s Political Council Leadership', 'Examine grassroots organizing and communication strategy.', 30, 1),
  ('34444444-4444-4444-4444-444444444444', '22222222-2222-2222-2222-222222222222', 'Carpool Logistics Simulation', 'Practice resource allocation decisions that sustained the boycott.', 35, 2),
  ('35555555-5555-5555-5555-555555555555', '23333333-3333-3333-3333-333333333333', 'Legal and Public Messaging', 'Interpret legal developments and persuasive public communication.', 30, 1),
  ('36666666-6666-6666-6666-666666666666', '23333333-3333-3333-3333-333333333333', 'Victory and Historical Reflection', 'Connect the boycott’s outcomes to broader civil rights struggles.', 30, 2)
on conflict (id) do update set
  title = excluded.title,
  objective = excluded.objective,
  estimated_minutes = excluded.estimated_minutes,
  position = excluded.position;

insert into activities(id, lesson_id, type, title, position, payload)
values
  (
    '41111111-1111-1111-1111-111111111111',
    '31111111-1111-1111-1111-111111111111',
    'reading',
    'Jim Crow Transit Rules',
    1,
    jsonb_build_object(
      'markdown',
      '# Segregated Transit in Montgomery\n\nCity bus riders faced rigid seating rules, public humiliation, and enforcement by drivers and police.\n\nConsider how this system shaped both personal risk and collective resistance.'
    )
  ),
  (
    '42222222-2222-2222-2222-222222222222',
    '32222222-2222-2222-2222-222222222222',
    'timeline',
    'Boycott Timeline',
    1,
    '{"events":[{"date":"1955-12-01","title":"Rosa Parks arrested","description":"Rosa Parks is arrested for refusing to surrender her seat."},{"date":"1955-12-05","title":"Boycott begins","description":"The Montgomery Bus Boycott officially starts and mass meetings are held."},{"date":"1956-02-24","title":"Bi-racial commission proposal","description":"The Alabama governor announces a bi-racial commission amid national pressure."},{"date":"1956-12-21","title":"Boycott ends","description":"After Supreme Court enforcement, integrated bus service begins and boycott concludes."}]}'::jsonb
  ),
  (
    '43333333-3333-3333-3333-333333333333',
    '33333333-3333-3333-3333-333333333333',
    'primary_source',
    'Primary Sources: Organizing Voices',
    1,
    '{"sources":[{"title":"WPC Leaflet (Dec 2, 1955)","type":"leaflet","excerpt":"Another woman has been arrested and taken to jail because she refused to get up out of her seat on the bus...","link":"https://www.crmvet.org/docs/551202_wpc.pdf"},{"title":"Rosa Parks Arrest Report","type":"report","excerpt":"Police report documenting the December 1, 1955 arrest in Montgomery.","link":"https://www.archives.gov"},{"title":"Langston Hughes: A Letter to the White Citizens of the South","type":"poem","excerpt":"You can’t legislate love, but you can legislate justice.","link":"https://www.poetryfoundation.org"}],"annotationPlaceholder":true}'::jsonb
  ),
  (
    '44444444-4444-4444-4444-444444444444',
    '33333333-3333-3333-3333-333333333333',
    'video',
    'Mass Meeting Speech Context',
    2,
    '{"url":"https://www.youtube.com/embed/hxN2M8f6YIY","transcript":"Transcript placeholder: first mass meeting framing and community strategy."}'::jsonb
  ),
  (
    '45555555-5555-5555-5555-555555555555',
    '34444444-4444-4444-4444-444444444444',
    'simulation_carpool',
    'Carpool Coordination Challenge',
    1,
    '{"scenarioKey":"mia_carpool_core","goal":"Move 120 riders across 3 shifts with limited vehicles and fuel.","roles":["worker","student","organizer"],"resources":{"cars":8,"drivers":12,"fuelUnits":30,"dispatchers":2},"rules":{"driverCapacity":4,"fuelPerTrip":2,"minOnTimeTrips":20},"successThreshold":70}'::jsonb
  ),
  (
    '46666666-6666-6666-6666-666666666666',
    '35555555-5555-5555-5555-555555555555',
    'quiz',
    'Turning Points Quiz',
    1,
    '{"passingScore":70,"questions":[{"id":"q1","prompt":"What happened on December 5, 1955?","options":["Federal ruling ended segregation","Boycott began","Rosa Parks was arrested","MIA dissolved"],"correctIndex":1,"explanation":"December 5 marked the first day of the organized boycott."},{"id":"q2","prompt":"Which organization coordinated boycott leadership?","options":["NAACP Youth Council","Women’s Political Council","Montgomery Improvement Association","SNCC"],"correctIndex":2,"explanation":"The MIA coordinated strategy and messaging."}]}'::jsonb
  ),
  (
    '47777777-7777-7777-7777-777777777777',
    '36666666-6666-6666-6666-666666666666',
    'reflection',
    'Letter to a Historical Figure',
    1,
    '{"prompt":"Write a letter to a historical figure from the boycott (Jo Ann Robinson, Rosa Parks, or Martin Luther King Jr.) explaining how their actions inspire present-day movements.","minWords":120}'::jsonb
  ),
  (
    '48888888-8888-8888-8888-888888888888',
    '36666666-6666-6666-6666-666666666666',
    'reading',
    'From Montgomery to National Change',
    2,
    jsonb_build_object(
      'markdown',
      '## Lasting Impact\n\nThe boycott built legal momentum, demonstrated disciplined nonviolent resistance, and became a model for future campaigns.'
    )
  )
on conflict (id) do update set
  title = excluded.title,
  position = excluded.position,
  payload = excluded.payload;
