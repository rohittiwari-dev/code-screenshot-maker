interface ShareMetadata {
	title: string;
	description: string;
	url: string;
	image?: string;
}

export function generateShareUrls(metadata: ShareMetadata) {
	const encodedUrl = encodeURIComponent(metadata.url);
	const encodedTitle = encodeURIComponent(metadata.title);
	const encodedDescription = encodeURIComponent(metadata.description);

	return {
		twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
		facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
		linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
		reddit: `https://reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`,
		telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedTitle}`,
		whatsapp: `https://wa.me/?text=${encodedTitle} ${encodedUrl}`,
		email: `mailto:?subject=${encodedTitle}&body=${encodedDescription} ${encodedUrl}`,
		copy: metadata.url,
	};
}

export function copyToClipboard(text: string): Promise<boolean> {
	if (navigator.clipboard && window.isSecureContext) {
		return navigator.clipboard
			.writeText(text)
			.then(() => true)
			.catch(() => false);
	} else {
		// Fallback for older browsers
		const textArea = document.createElement("textarea");
		textArea.value = text;
		textArea.style.position = "fixed";
		textArea.style.left = "-999999px";
		textArea.style.top = "-999999px";
		document.body.appendChild(textArea);
		textArea.focus();
		textArea.select();

		try {
			document.execCommand("copy");
			textArea.remove();
			return Promise.resolve(true);
		} catch {
			textArea.remove();
			return Promise.resolve(false);
		}
	}
}
