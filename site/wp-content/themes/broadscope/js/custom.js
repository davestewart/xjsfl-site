function init()
{
	// add links to headings
		function addLink(i, e)
		{
			// variables
				e = jQuery(e);
				
			// check link is not in a nolinks container
				var parents = e.parents('.nolinks');
				if(parents.length)
				{
					return;
				}
				
			// add link to elements which don't have a link
				var text = e.text();
				var id = text
					.toLowerCase()
					.replace(/\(.+$/g, '')
					.replace(/\W+/g, '-')
					.replace(/^-|-$/g, '');
					
			// add link to elements which don't have a link
				var a = e.find('a');
				if(a.length == 0)
				{
					e.html('<a id="' +id+ '" name="' +id+ '" href="#' +id+ '" title="Link to this section...">' +e.text()+ '</a>')
				}
				
			// otherwise, add a named anchor to the existing link
				else
				{
					var name = a.attr('name');
					if( ! name)
					{
						a.attr('name', id);		
					}
					if( ! a.attr('title'))
					{
						a.attr('title', 'Link to this section...');
					}
				}
				
				
		}
		jQuery('.entry-content h2, .entry-content h3, .entry-content h4, .entry-content h5').each(addLink);
		
	// convert tabs in code samples to spaces
		jQuery('pre').tabSize(4);
		
	// pretty-print all code samples
		jQuery('pre[lang=javascript]').addClass('prettyprint lang-javascript');
		prettyPrint();
}

init();

