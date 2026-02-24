/**
 * Auto-generated Open Graph image for social link previews.
 *
 * Design is configured via site-config.yaml:
 *   project.name       → title text
 *   project.tagline    → subtitle text (falls back to project.description)
 *   colors.primary     → background colour
 *   colors.accent      → decorative stripe colour
 *   og.logo            → optional path to logo image (e.g. /images/logo.png)
 *   og.bgColor         → overrides colors.primary for the OG background
 *
 * Output: 1200 × 630 px PNG — works with Twitter, Facebook, LinkedIn, Discord, Slack.
 */

import type { APIRoute } from 'astro';
import { readFileSync } from 'node:fs';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';
import site from '../../site-config.yaml';

// Load Inter font from the local @fontsource/inter package (no network needed at build time)
const fontRegular = readFileSync(
	new URL('../../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff', import.meta.url),
).buffer;
const fontBold = readFileSync(
	new URL('../../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff', import.meta.url),
).buffer;

export const prerender = true;

// Satori element helpers (no React needed)
function el(
	type: string,
	style: Record<string, any>,
	children: any = undefined,
): Record<string, any> {
	return { type, props: { style, children } };
}

export const GET: APIRoute = async () => {
	const { project, colors } = site;
	const og = (site as any).og ?? {};

	const bgColor: string = og.bgColor ?? colors.primary;
	const accentColor: string = colors.accent;
	const title: string = project.name ?? 'Research Project';
	const subtitle: string = project.tagline ?? project.description ?? '';

	const logoBase64: string | null = (() => {
		if (!og.logo) return null;
		try {
			const logoPath = new URL(`../../public${og.logo}`, import.meta.url);
			const buf = readFileSync(logoPath);
			const ext = (og.logo as string).split('.').pop()?.toLowerCase();
			const mime = ext === 'svg' ? 'image/svg+xml' : ext === 'png' ? 'image/png' : 'image/jpeg';
			return `data:${mime};base64,${buf.toString('base64')}`;
		} catch {
			return null;
		}
	})();

	const image = el(
		'div',
		{
			display: 'flex',
			flexDirection: 'column',
			width: '100%',
			height: '100%',
			backgroundColor: bgColor,
			padding: '0',
			position: 'relative',
		},
		[
			// Top accent stripe
			el('div', {
				position: 'absolute',
				top: 0,
				left: 0,
				right: 0,
				height: '8px',
				backgroundColor: accentColor,
			}),
			// Content area
			el(
				'div',
				{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					flex: 1,
					padding: '80px 100px',
					gap: '24px',
				},
				[
					// Optional logo
					...(logoBase64
						? [
								el('img', {
									src: logoBase64,
									width: 80,
									height: 80,
									objectFit: 'contain',
									marginBottom: '8px',
								}),
						  ]
						: []),
					// Title
					el(
						'div',
						{
							fontSize: title.length > 30 ? 56 : 72,
							fontWeight: 700,
							color: '#ffffff',
							textAlign: 'center',
							lineHeight: 1.15,
							fontFamily: 'Inter',
						},
						title,
					),
					// Subtitle
					...(subtitle
						? [
								el(
									'div',
									{
										fontSize: 28,
										fontWeight: 400,
										color: 'rgba(255,255,255,0.75)',
										textAlign: 'center',
										maxWidth: '900px',
										lineHeight: 1.4,
										fontFamily: 'Inter',
									},
									subtitle,
								),
						  ]
						: []),
				],
			),
			// Bottom bar
			el(
				'div',
				{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					height: '56px',
					backgroundColor: 'rgba(0,0,0,0.25)',
					color: 'rgba(255,255,255,0.5)',
					fontSize: 16,
					fontFamily: 'Inter',
					letterSpacing: '0.1em',
				},
				'LASIGE · Faculdade de Ciências · Universidade de Lisboa',
			),
		],
	);

	const svg = await satori(image as any, {
		width: 1200,
		height: 630,
		fonts: [
			{ name: 'Inter', data: fontRegular, weight: 400, style: 'normal' },
			{ name: 'Inter', data: fontBold,    weight: 700, style: 'normal' },
		],
	});

	const png = new Resvg(svg).render().asPng();

	return new Response(new Uint8Array(png), {
		headers: { 'Content-Type': 'image/png', 'Cache-Control': 'public, max-age=86400' },
	});
};
