# Welbi Interview

Here is my submission for the Welbi Coding Assessment, I decided to go with the front-end since it gave me an opportunity to play around with some Frameworks I had either not used or hadn't used in a little while.

## Live Version

I deployed user docker-compose and Caddy on a personal server running a few other websites/tools link is below:

https://welbi.ghassanachi.com

## Architecture

1. _NextJs_: I have used Next in the past and really enjoyed it, and I also noticed it was mentioned in the Job Description so I thought it was appropriate to use it here.
1. _SWR_: I've used `react-query` a lot in the past, but I've found that the integration with Next is always a little finicky. So instead I gabe Vercel's own _SWR_ a go, and played around with SSR as well to see how nice it was to work
1. _Tailwind_: I love tailwind, and it is my go to for most projects. I also find that Tailwind UI gives a great starting point, since I am not the greatest with design, so when I don't have the luxury of having a designer on hand, I find myself looking at Tailwind UI for inspiration and a good starting point.
1. _NextAuth_: Great library, and it makes it a little easier to manage sessions in a SSR and Client side context.

## Pages

1. _Programs_: Program page that show all the programs and participants in a grid view. I added a simple search bar at the top to be able to filter programs by name.
1. _Residents_: I know this was not asked as part of the interview, but a lot of code could be reused from the programs page so I thought I would include it.

## Notes

I started working on the "Create Resident" page, but since I was running over on the time I decided to stop and disabled to button to naviate to the page. Since you mentioned that I could use this for my portfolio, and I enjoyed building this website, I might add it in the future along with some other functionality like Create Program, Add Resident to program.
