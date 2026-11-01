const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
let lang = 'zh', currentProject = 0, lastTrigger = null;
try { lang = new URLSearchParams(location.search).get('lang') || localStorage.getItem('xp-language') || 'zh'; } catch {}
if (!['zh','en'].includes(lang)) lang = 'zh';
const t = (zh,en) => lang === 'zh' ? zh : en;
const projects = [
 {title:'Skein',external:true,id:'Y1iZvxKTz_s',image:'skein',duration:'01:17',alt:['Skein 预告片：女孩站在旧式房屋内','Skein trailer: a girl inside a period interior'],subtitle:['在语言与细节中，还原一个年代。','Rebuilding a time and place through language and detail.'],tags:[['导演','Director'],['短片','Short film'],['2024','2024']],description:['以粤语与广东 00 年代生活为背景，在上海的拍摄现场，从演员、台词到场景与表演细节，参与建立真实的地域质感。','A Cantonese-language short rooted in 2000s Guangdong. Filmed in Shanghai, with contributions across casting, dialogue, locations and on-set performance to build a believable sense of place.'],credits:[['IM 两岸青年影展 · 入选','Selected for IM Film Festival'],['金鸡百花电影节 · 短片季入围','Golden Rooster & Hundred Flowers Film Festival · Short Film Season shortlist']],notes:[[['前期 / 文化语境','PRE-PRODUCTION / CULTURAL CONTEXT'],['协助选择粤语母语演员，结合年代背景调整台词，并在上海寻找贴近 00 年代广东生活风格的拍摄空间。','Supported Cantonese-speaking casting, refined period-appropriate dialogue, and helped identify Shanghai locations that could evoke Guangdong in the 2000s.']],[['现场 / 细节执行','ON SET / THE DETAILS'],['参与台词语气、人物微动作与现场调度的协调，协助美术、灯光与镜头表达共同还原故事氛围。','Coordinated dialogue delivery, small performance details and staging, supporting the visual consistency of art direction, lighting and camera work.']],[['后期 / 语言校对','POST / LANGUAGE REVIEW'],['参与粤语字幕校对与内容核对，让语言、文化与叙事保持一致。','Supported Cantonese subtitle review and language checks to preserve cultural and narrative consistency.']]]},
 {title:'Lamb',id:'nAjTkL2ijTQ',image:'lamb',duration:'00:48',alt:['Lamb 预告片：室内对话场景','Lamb trailer: an interior conversation'],subtitle:['进入另一个故事的片刻。','A glimpse into another story.'],tags:[['制片','Producer'],['短片','Short film'],['预告片','Trailer']],description:['制片作品《Lamb》。在 48 秒的预告中，观看人物、空间与镜头之间的关系，进入故事的氛围。','Producer on Lamb. Explore the relationship between people, space and framing in this 48-second trailer. Open the screening room to watch Lamb.'],credits:[],notes:[[['作品放映','SCREENING'],['在《Lamb》中担任制片。这里展示本片预告，原始视频及频道信息可通过下方 YouTube 链接查看。','Producer on Lamb. This selection presents the trailer; follow the YouTube link for the original video and channel information.']]]},
 {title:'Lure',id:'LbwaczQ7HMk',image:'lure',duration:'TRAILER',restricted:true,alt:['Lure 预告片封面','Lure trailer artwork'],subtitle:['让画面，引出好奇。','An invitation to look closer.'],tags:[['制片','Producer'],['短片','Short film'],['YouTube 限龄','YouTube age-restricted']],description:['制片作品《Lure》预告片。该视频目前设置了 YouTube 年龄限制，请通过 YouTube 原页面登录后观看。','Producer on Lure. This video is currently age-restricted on YouTube; watch on its original page after signing in.'],credits:[],notes:[[['观看方式','HOW TO WATCH'],['在《Lure》中担任制片。由于 YouTube 的年龄限制，本作品需在 YouTube 原页面观看，可通过直达入口打开。','Producer on Lure. Because of YouTube age restrictions, this work needs to be watched on the original YouTube page. Use the direct link to continue.']]]}
];
const filmProfiles = [
  {
    "primaryGenre": [
      "心理剧情片 / Psychological Drama",
      "Psychological Drama"
    ],
    "subgenres": [
      [
        "心理恐怖",
        "Psychological Horror"
      ],
      [
        "社会现实主义",
        "Social Realism"
      ],
      [
        "家庭剧情",
        "Family Drama"
      ]
    ],
    "description": [
      "2005 年，在中国计划生育政策的背景下，一位怀孕母亲陷入产前焦虑、家庭压力与反复出现的噩梦。影片以女性心理创伤为核心，在家庭关系与社会制度压力之间，展开心理剧情与心理恐怖交织的叙事。",
      "Set in China in 2005 against the backdrop of the family-planning policy, Skein follows a pregnant mother caught in prenatal anxiety, family pressure and recurring nightmares. Centred on female psychological trauma, the film brings psychological drama and horror into dialogue with family relationships and systemic social pressures."
    ],
    "positioning": [
      "以心理剧情为主，融入心理恐怖元素。",
      "Psychological Drama with elements of Psychological Horror."
    ],
    "themes": [
      "女性心理创伤、产前焦虑与社会制度压力构成叙事核心。噩梦循环带来心理恐怖元素，计划生育政策与家庭关系则赋予影片社会现实主义的视角。",
      "Female psychological trauma, prenatal anxiety and systemic social pressure form the narrative core. Recurring nightmares introduce psychological horror, while the family-planning context and family relationships ground the film in social realism."
    ]
  },
  {
    "primaryGenre": [
      "心理惊悚片 / Psychological Thriller",
      "Psychological Thriller"
    ],
    "subgenres": [
      [
        "家庭伦理剧情",
        "Domestic Drama"
      ],
      [
        "悬疑",
        "Mystery"
      ],
      [
        "女性主义电影",
        "Feminist Cinema"
      ]
    ],
    "description": [
      "一位遭受家庭暴力与精神虐待的女性，在丈夫失踪后开始寻找线索。随着线索逐渐浮现，亲密关系中的精神控制与家庭创伤也被揭开。影片以心理惊悚与悬疑叙事，关注女性创伤、女性主体性与反家暴主题。",
      "After her husband disappears, a woman who has endured domestic violence and psychological abuse begins searching for clues. Her investigation brings coercive control and family trauma into focus. Blending psychological suspense with mystery, Lamb explores female trauma, agency and resistance to domestic violence."
    ],
    "positioning": [
      "以心理惊悚叙事，探讨家庭暴力与女性创伤。",
      "Psychological Thriller exploring domestic violence and female trauma."
    ],
    "themes": [
      "丈夫失踪形成悬疑与惊悚的叙事动力，家暴、精神控制与家庭创伤构成人物的心理处境。女性主义与反家暴是作品的核心主题，而不只是类型标签。",
      "The husband’s disappearance drives the mystery and thriller narrative, while abuse, coercive control and family trauma shape the protagonist’s psychological reality. Feminism and opposition to domestic violence are central themes rather than simply genre labels."
    ]
  },
  {
    "primaryGenre": [
      "犯罪惊悚片 / Crime Thriller",
      "Crime Thriller"
    ],
    "subgenres": [
      [
        "悬疑",
        "Mystery"
      ],
      [
        "犯罪剧情",
        "Crime Drama"
      ],
      [
        "新黑色电影风格",
        "Neo-noir"
      ]
    ],
    "description": [
      "一宗肇事逃逸案件，被受贿与利益交易掩盖了真相。四年后，过去的决定引发连锁后果，案件的隐情逐步浮现。影片以犯罪惊悚与悬疑叙事，追问腐败、道德选择与人性的复杂性。",
      "A hit-and-run is concealed through bribery and corruption. Four years later, past decisions trigger a chain of consequences, gradually exposing what happened. Combining crime-thriller tension with mystery, Lure examines corruption, moral choices and the complexities of human behaviour."
    ],
    "positioning": [
      "犯罪惊悚 / 悬疑剧情。",
      "Crime Thriller / Mystery Drama."
    ],
    "themes": [
      "犯罪、腐败与真相追查构成犯罪惊悚的核心，逐步揭露过去案件的过程形成悬疑结构。道德灰色地带与犯罪阴影带有新黑色电影特征；Neo-noir 在这里作为风格参考，正式归类仍取决于影片的视觉与叙事风格。",
      "Crime, corruption and the search for truth anchor the thriller, while the gradual revelation of the past creates its mystery structure. Moral ambiguity and the shadow of crime suggest neo-noir qualities; Neo-noir is used here as a stylistic reference, with formal classification dependent on the film’s visual and narrative approach."
    ]
  }
];
projects.forEach((project,index)=>Object.assign(project,filmProfiles[index]));
function filmProfileMarkup(p,l){
 const subgenres=p.subgenres.map(genre=>genre[l]).join(l===0?' · ':' / ');
 return `<div class="film-profile"><strong>${t('剧情简介','SYNOPSIS')}</strong><p>${p.description[l]}</p><div class="film-genre-summary"><div><strong>${t('主要类型','PRIMARY GENRE')}</strong><p>${p.primaryGenre[l]}</p></div><div><strong>${t('细分类型','SUBGENRES')}</strong><p>${subgenres}</p></div></div><strong>${t('类型定位','POSITIONING')}</strong><p>${p.positioning[l]}</p><strong>${t('主题与叙事','THEMES & APPROACH')}</strong><p>${p.themes[l]}</p></div>`;
}
const experiences = [
 {date:'2026.06 — PRESENT',name:['腾讯','Tencent'],role:['新媒体运营实习生','New Media Operations Intern'],label:'CONTENT / AUDIENCE / GROWTH',body:['围绕宠物行业四大细分赛道开展商家与内容研究，比较视频号、TikTok 和小红书的内容形式与转化路径。参与内容累计曝光 25 万+，获得 3 家行业媒体转载，并形成可复用的内容模板与工作流程。','Researched four pet-industry sectors and compared content and conversion journeys across WeChat Channels, TikTok and Rednote. Contributed to content reaching 250K+ impressions, reposts by three industry outlets, and reusable templates and workflows.']},
 {date:'2026.01 — 2026.04',name:['The Admissions Pathway','The Admissions Pathway'],role:['数字营销策略实习生','Digital Marketing Strategy Intern'],label:'STRATEGY / CROSS-CULTURAL COMMUNICATION',body:['围绕品牌进入韩国市场，研究竞争环境与受众需求，构建三类目标群体。设计 Naver、YouTube、KakaoTalk 与线下教育合作相结合的渠道策略，支持品牌信任与合作伙伴开发。','Researched competitors and audience needs for the brand’s South Korean market-entry strategy, identifying three audience groups. Designed a channel mix spanning Naver, YouTube, KakaoTalk and offline education partnerships.']},
 {date:'2025.04 — 2025.07',name:['中央广播电视总台','China Central Television'],role:['节目策划与编剧实习生','Programme Planning & Scriptwriting Intern'],label:'CCTV-14 / SUPER TOY STORE',body:['参与少儿频道《超级玩具店》选题调研、内容创意与脚本创作。围绕 30 余类玩具的特性设计故事及互动环节，多轮优化叙事与儿童受众表达，支持节目正式播出。','Researched and developed ideas and scripts for CCTV-14’s Super Toy Store. Translated the features of 30+ toy categories into stories and interactive segments, refining narratives for young audiences ahead of broadcast.']},
 {date:'2024.10 — 2025.02',name:['中国教育电视台','China Education Television'],role:['节目编导实习生','Programme Director Intern'],label:'RHYTHM OF YOUTH / SEASON 3',body:['参与《青春的旋律》第三季第四单元，围绕南京传媒学院红色故事讲解团展开纪录拍摄。负责主题与故事结构、采访提纲、现场拍摄调度，并参与素材筛选、剪辑包装、字幕及最终修改。','Worked on the fourth unit of Rhythm of Youth, Season 3, documenting a student storytelling group. Contributed to themes, narrative structure, interview questions, on-set direction, footage selection, editing, subtitles and final revisions.']},
 {date:'2024.01 — 2024.02',name:['TOP Group','TOP Group'],role:['宣传实习生','Publicity Intern'],label:'BRAND / COMMUNICATION',body:['撰写品牌宣传及社交媒体内容，参与官方渠道维护与公关传播活动，协调执行细节与沟通物料。','Developed brand and social content, supported official communications channels and PR campaigns, and coordinated delivery details and communication materials.']},
 {date:'2023.06 — 2023.09',name:['广州广播电视台','Guangzhou Broadcasting Network'],role:['电视编导实习生','TV Directing Intern'],label:'PRODUCTION / LIVE EVENT',body:['参与人物宣传片的资料搜集、采访脚本、外景拍摄与后期剪辑。支持 150 人以上发布活动的现场协调，参与制作的微信人物视频播放量超过 5 万。','Supported profile-film research, interview scripts, location filming and post-production. Coordinated elements of a 150+ attendee launch event and contributed to a WeChat profile video reaching 50K+ views.']}
];
function applyLanguage(){
 document.documentElement.lang=lang==='zh'?'zh-CN':'en';
 document.title=t('潘璇宇 Xuanyu Pan — 导演 · 制片 · 影像作品集','Xuanyu Pan — Director, Producer & Visual Storyteller');
 document.querySelector('meta[name="description"]').content=t('潘璇宇的影像作品集。影视制作、内容策划与数字传播。','The portfolio of Xuanyu Pan: film direction, production, content development and digital media.');
 $('#language').innerHTML=lang==='zh'?'ENGLISH <span>↔</span>':'中文 <span>↔</span>';
 $('#language').setAttribute('aria-label',t('Switch to English','切换为中文'));
 $('.brand').setAttribute('aria-label',t('潘璇宇 · 首页','Xuanyu Pan · Home'));
 $('.desktop-nav').setAttribute('aria-label',t('主导航','Main navigation'));
 $('.mobile-nav').setAttribute('aria-label',t('移动导航','Mobile navigation'));
 $('.work-tabs').setAttribute('aria-label',t('选择作品','Select a project'));
 $('#prev-project').setAttribute('aria-label',t('上一个作品','Previous project'));
 $('#next-project').setAttribute('aria-label',t('下一个作品','Next project'));
 $$('[data-zh]').forEach(el=>el.textContent=el.dataset[lang]);
 $$('[data-alt-zh]').forEach(el=>el.alt=el.getAttribute(`data-alt-${lang}`));
 $('.music-cover').setAttribute('aria-label',t('在 B 站观看 MAGI《Vitality》MV','Watch the MAGI Vitality music video on Bilibili'));


 $('.menu-toggle').setAttribute('aria-label',t('打开导航','Open navigation'));
 $('#close-screening').setAttribute('aria-label',t('关闭放映室','Close screening room'));
 const opened=$$('#experience-list details').map((el,i)=>el.open?i:-1);
 $('#experience-list').innerHTML=experiences.map((e,i)=>`<details ${opened.includes(i)?'open':''}><summary><span class="date">${e.date}</span><strong>${e.name[lang==='zh'?0:1]}</strong><span class="role">${e.role[lang==='zh'?0:1]}</span><span class="plus" aria-hidden="true">+</span></summary><div class="experience-detail"><span class="detail-label">${e.label}</span><p>${e.body[lang==='zh'?0:1]}</p></div></details>`).join('');
 renderProject(currentProject);
}
function renderProject(index){
 currentProject=(index+projects.length)%projects.length;
 const p=projects[currentProject],l=lang==='zh'?0:1;
 $$('.work-tabs button').forEach((el,i)=>{el.setAttribute('aria-selected',i===currentProject?'true':'false');el.tabIndex=i===currentProject?0:-1});
 $('#project-panel').setAttribute('aria-labelledby',`tab-${currentProject}`);
 $('#project-img').src=`assets/${p.image}.jpg`;$('#project-img').alt=p.alt[l];
 $('#project-play').dataset.play=currentProject;
 $('#project-play').setAttribute('aria-label',t(`观看 ${p.title} 预告片`,`Watch ${p.title} trailer`));
 $('#project-title').textContent=p.title;$('#project-number').textContent=`PROJECT / 0${currentProject+1}`;
 $('#project-duration').textContent=p.duration;
 $('#project-award').hidden=currentProject!==0;
 $('#project-kind').textContent=p.restricted?'YOUTUBE / AGE-RESTRICTED':'SHORT FILM / TRAILER';
 $('#project-subtitle').textContent=p.primaryGenre[l];
 $('#project-genres').innerHTML=`<span>${t('细分类型','SUBGENRES')}</span><p>${p.subgenres.map(genre=>genre[l]).join(' · ')}</p>`;
 $('#project-description').textContent=p.description[l];
 $('#project-tags').innerHTML=p.tags.map(tag=>`<span>${tag[l]}</span>`).join('');
 $('#project-credits').innerHTML=p.credits.map(c=>`<span>↗ ${c[l]}</span>`).join('');
 $('#project-counter').textContent=`0${currentProject+1} / 03`;
 $('.pagination-line span').style.transform=`translateX(${currentProject*100}%)`;
}
function openScreening(index,trigger){
 lastTrigger=trigger;const p=projects[index],l=lang==='zh'?0:1;
 $('#screening-title').textContent=p.title;
 $('#screening-index').textContent=`PROJECT 0${index+1} / SHORT FILM`;
 $('#screening-notes').innerHTML=filmProfileMarkup(p,l)+`<div class="film-production-notes"><span class="micro">${t('制作与观看','PRODUCTION & SCREENING')}</span>${p.notes.map(n=>`<strong>${n[0][l]}</strong><p>${n[1][l]}</p>`).join('')}</div>`;
 const url=`https://www.youtube.com/watch?v=${p.id}`;
 $('#youtube-link').href=url;
 if(p.restricted||p.external){$('#video-host').innerHTML=`<div class="restricted-video ${p.image}"><strong>${p.title.toUpperCase()}</strong><p>${p.restricted?t('本视频在 YouTube 设置了年龄限制，需前往 YouTube 登录观看。','This film is age-restricted. Continue to YouTube and sign in to watch.'):t('此预告目前无法在站外播放，可前往 YouTube 原页面观看。','This trailer is currently unavailable in embedded playback. Watch it on YouTube.')}</p><a href="${url}" target="_blank" rel="noopener noreferrer">${t('前往 YouTube 观看 ↗','WATCH ON YOUTUBE ↗')}</a></div>`}
 else {const frame=document.createElement('iframe');frame.src=`https://www.youtube-nocookie.com/embed/${p.id}?autoplay=1&rel=0`;frame.title=`${p.title} — Trailer`;frame.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';frame.allowFullscreen=true;frame.referrerPolicy='strict-origin-when-cross-origin';$('#video-host').replaceChildren(frame)}
 $('#screening').showModal();document.body.style.overflow='hidden';$('#close-screening').focus();
}
function closeScreening(){$('#screening').close()}
$('#screening').addEventListener('close',()=>{$('#video-host').replaceChildren();document.body.style.overflow='';lastTrigger?.focus()});
$('#screening').addEventListener('click',e=>{if(e.target===$('#screening')){const r=e.target.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeScreening()}});
$('#close-screening').addEventListener('click',closeScreening);
$$('[data-play]').forEach(el=>el.addEventListener('click',()=>openScreening(Number(el.dataset.play),el)));
$('#project-detail').addEventListener('click',e=>openScreening(currentProject,e.currentTarget));
$$('[data-project]').forEach(el=>el.addEventListener('click',()=>renderProject(Number(el.dataset.project))));
$('.work-tabs').addEventListener('keydown',e=>{if(!['ArrowLeft','ArrowRight','Home','End'].includes(e.key))return;e.preventDefault();renderProject(e.key==='Home'?0:e.key==='End'?2:currentProject+(e.key==='ArrowRight'?1:-1));$(`#tab-${currentProject}`).focus()});
$('#prev-project').addEventListener('click',()=>renderProject(currentProject-1));$('#next-project').addEventListener('click',()=>renderProject(currentProject+1));

$('#language').addEventListener('click',()=>{
 lang=lang==='zh'?'en':'zh';
 try{localStorage.setItem('xp-language',lang);const url=new URL(location.href);url.searchParams.set('lang',lang);history.replaceState(null,'',url)}catch{}
 applyLanguage();
});
$('.menu-toggle').addEventListener('click',()=>{const open=$('.mobile-nav').hidden;$('.mobile-nav').hidden=!open;$('.menu-toggle').setAttribute('aria-expanded',String(open))});
$$('.mobile-nav a').forEach(el=>el.addEventListener('click',()=>{$('.mobile-nav').hidden=true;$('.menu-toggle').setAttribute('aria-expanded','false')}));
document.addEventListener('keydown',e=>{if(e.key==='Escape'){$('.mobile-nav').hidden=true;$('.menu-toggle').setAttribute('aria-expanded','false')}});
let toastTimer;
$('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('sarahpanxy@163.com');$('#toast').textContent=t('邮箱已复制','Email address copied')}catch{$('#toast').textContent='sarahpanxy@163.com'}$('#toast').classList.add('visible');clearTimeout(toastTimer);toastTimer=setTimeout(()=>$('#toast').classList.remove('visible'),3000)});
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});$$('.reveal').forEach(el=>observer.observe(el))}else{$$('.reveal').forEach(el=>el.classList.add('visible'))}
let scrollPending=false;window.addEventListener('scroll',()=>{if(scrollPending)return;scrollPending=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$('.progress').style.width=`${max>0?scrollY/max*100:0}%`;scrollPending=false})},{passive:true});
applyLanguage();
