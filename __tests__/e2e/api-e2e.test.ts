import { test, expect } from '@playwright/test';
/**
 * This is a smoke tests to be sure that api is working after build
 */
test('should create a device', async ({ request }) => {
    const newDevice = await request.post(`/create-device`, {
      data: {
        "id": "16557499016731",
        "algorithm": "rsa",
        "label": "Test device"
        }
    });
    expect(newDevice.ok()).toBeTruthy();
    const device = await newDevice.json();
    expect(device.uuid).toBe('16557499016731');
    expect(device.label).toBe('Test device');
    expect(device.signatureCounter).toBe(0);
    expect(device.isActive).toBe(true);
});

test('should create signature', async ({ request }) => {
    const newSignature = await request.post(`/sign-transaction`, {
        data: {
            "data": "data to sign"
        }
      });
    expect(newSignature.ok()).toBeTruthy();
});