// src/app/actions/checkDomains.ts
'use server'

import { DomainResult } from '@/components/StartupNameGenerator'
import { parseString } from 'xml2js'
import { promisify } from 'util'

const parseXml = promisify(parseString)

const NAMECHEAP_API_USER = process.env.NAMECHEAP_API_USER;
const NAMECHEAP_API_KEY = process.env.NAMECHEAP_API_KEY;
const NAMECHEAP_USERNAME = process.env.NAMECHEAP_USERNAME;
const NAMECHEAP_CLIENT_IP = process.env.NAMECHEAP_CLIENT_IP;

export async function checkDomains(domains: string[]): Promise<DomainResult[]> {
  console.log('Checking domains:', domains);

  try {
    const results = await Promise.all(domains.map(async (domain) => {
      const url = new URL('https://api.namecheap.com/xml.response');
      url.searchParams.append('ApiUser', NAMECHEAP_API_USER || '');
      url.searchParams.append('ApiKey', NAMECHEAP_API_KEY || '');
      url.searchParams.append('UserName', NAMECHEAP_USERNAME || '');
      url.searchParams.append('Command', 'namecheap.domains.check');
      url.searchParams.append('ClientIp', NAMECHEAP_CLIENT_IP || '');
      url.searchParams.append('DomainList', domain);

      const response = await fetch(url.toString());
      const text = await response.text();

      // Parse XML response
      const result = await parseXml(text);
      
      if (result.ApiResponse.$.Status !== 'OK') {
        throw new Error(`API response status is not OK: ${result.ApiResponse.Errors[0].Error[0]._}`);
      }

      const domainCheck = result.ApiResponse.CommandResponse[0].DomainCheckResult[0].$;
      const available = domainCheck.Available === 'true';
      const price = available ? parseFloat(domainCheck.PremiumRegistrationPrice || '0') : null;

      return {
        name: domain,
        available,
        price,
      };
    }));

    console.log('Namecheap API Response:', results);
    return results;
  } catch (error) {
    console.error('Error checking domains:', error);
    return domains.map(domain => ({ name: domain, available: false, price: null }));
  }
}
