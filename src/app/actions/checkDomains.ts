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
      let price = null;

      if (available) {
        if (domainCheck.IsPremiumName === 'true') {
          price = parseFloat(domainCheck.PremiumRegistrationPrice || '0');
        } else {
          // For non-premium domains, we need to make another API call to get the price
          price = await getRegularDomainPrice(domain);
        }
      }

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

async function getRegularDomainPrice(domain: string): Promise<number | null> {
  const url = new URL('https://api.namecheap.com/xml.response');
  url.searchParams.append('ApiUser', NAMECHEAP_API_USER || '');
  url.searchParams.append('ApiKey', NAMECHEAP_API_KEY || '');
  url.searchParams.append('UserName', NAMECHEAP_USERNAME || '');
  url.searchParams.append('Command', 'namecheap.users.getPricing');
  url.searchParams.append('ClientIp', NAMECHEAP_CLIENT_IP || '');
  url.searchParams.append('ProductType', 'DOMAIN');
  url.searchParams.append('ProductCategory', 'REGISTER');
  url.searchParams.append('ProductName', domain.split('.').pop() || '');

  try {
    const response = await fetch(url.toString());
    const text = await response.text();
    const result = await parseXml(text);

    if (result.ApiResponse.$.Status !== 'OK') {
      throw new Error(`API response status is not OK: ${result.ApiResponse.Errors[0].Error[0]._}`);
    }

    const productPrice = result.ApiResponse.CommandResponse[0].UserGetPricingResult[0].ProductType[0].ProductCategory[0].Product[0].Price[0];
    return parseFloat(productPrice.$.Price);
  } catch (error) {
    console.error('Error getting regular domain price:', error);
    return null;
  }
}
