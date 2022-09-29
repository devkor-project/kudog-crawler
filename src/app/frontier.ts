import { parseTree } from '@/interface/parse';
import { siteInfo, url } from '@/interface/site';
import axios from 'axios';

// TODO :: robots는 7일에 한번 ..?, 매일 검사할 필요는 없어보여요
const fetchRobots = async (host: url): Promise<string> => {
  const robotsURL = `${host}/robots.txt`;
  const response = await axios.get(robotsURL);
  const robots = response.data as string;
  return robots;
};

const parseRobots = async (robots: string): Promise<parseTree[]> => {
  const agents = robots.split('User-agent: ');
  const forAll = agents.find((agent) => agent[0] === '*');
  const lines = forAll.split('\n');
  const allows = [];
  const disallows = [];
  lines.forEach((line) => {
    const startsAt = line.search('/');
    const subdomain = line.substring(startsAt).replace('\r', '');
    if (line.startsWith('Allow: ')) {
      allows.push(subdomain);
    } else if (line.startsWith('Disallow: ')) {
      disallows.push(subdomain);
    }
  });
  const tree: parseTree = { value: '', next: null, allow: false };
  let ptr = tree;
  allows.forEach((allow) => {
    [ptr] = tree.next;
    // TODO:: make tree

  });
  // check if urls are allowed
  console.log(allows);
  console.log(disallows);
  return [];
};

const frontier = async (sites: siteInfo[]): Promise<siteInfo[]> => {
  await Promise.all(sites.map(async (site) => {
    // const robots = await fetchRobots(site.host);
    const robots = await fetchRobots('https://info.korea.ac.kr');
    const allows = await parseRobots(robots);
  }));
  return [];
};

export default frontier;
