import { expect, test } from 'vitest';
import { parseImageRetrieveInformation } from './parseImageRetrieveInformation';
import { IMAGE_DATA } from '~/mocks/image-data';

test('parseImageRetrieveInformation', async () => {
  const res = await parseImageRetrieveInformation(IMAGE_DATA.lighthouse);

  expect(res).toBeDefined();
}, 30000);
