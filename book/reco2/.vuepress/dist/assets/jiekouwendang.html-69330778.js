import{_ as i,r as d,o as s,c as a,b as t,d as e,e as l,a as u}from"./app-ac0f136b.js";const r={},o=t("h1",{id:"平台支付接口文档-v1-1-1",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#平台支付接口文档-v1-1-1","aria-hidden":"true"},"#"),e(" 平台支付接口文档 v1.1.1")],-1),c=t("h2",{id:"_0-接入准备",tabindex:"-1"},[t("a",{class:"header-anchor",href:"#_0-接入准备","aria-hidden":"true"},"#"),e(" 0 接入准备")],-1),v={href:"http://192.168.200.123:3394",target:"_blank",rel:"noopener noreferrer"},q=t("code",null,"测试环境",-1),m=t("li",null,"获取appId",-1),b=t("li",null,"获取appSecret",-1),g={href:"http://192.168.200.123:3394/assets/pay-sdk.rar",target:"_blank",rel:"noopener noreferrer"},h=u(`<h2 id="_1-规范说明" tabindex="-1"><a class="header-anchor" href="#_1-规范说明" aria-hidden="true">#</a> 1 规范说明</h2><h3 id="_1-1-请求方法" tabindex="-1"><a class="header-anchor" href="#_1-1-请求方法" aria-hidden="true">#</a> 1.1 请求方法</h3><p>所有接口只支持POST方法发起请求。</p><h3 id="_1-2-格式说明" tabindex="-1"><a class="header-anchor" href="#_1-2-格式说明" aria-hidden="true">#</a> 1.2 格式说明</h3><p>元素出现要求说明：</p><table><thead><tr><th style="text-align:center;">符号</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td style="text-align:center;">R</td><td style="text-align:left;">报文中该元素必须出现（Required）</td></tr><tr><td style="text-align:center;">O</td><td style="text-align:left;">报文中该元素可选出现（Optional）</td></tr><tr><td style="text-align:center;">C</td><td style="text-align:left;">报文中该元素在一定条件下出现（Conditional）</td></tr></tbody></table><h3 id="_1-3-报文规范说明" tabindex="-1"><a class="header-anchor" href="#_1-3-报文规范说明" aria-hidden="true">#</a> 1.3 报文规范说明</h3><ol><li><p>报文规范仅针对交易请求数据进行描述；</p></li><li><p>报文规范中请求报文的内容为Https请求报文中bizContent值的明文内容；</p></li><li><p>报文规范分为请求报文和响应报文。请求报文描述由发起方，响应报文由报文接收方响应。</p></li><li><p>报文都是明文,没有非常严格地用des进行加密,但是需要用md5进行签名,用来校验请求是否篡改。</p></li></ol><h3 id="_1-4-请求报文结构" tabindex="-1"><a class="header-anchor" href="#_1-4-请求报文结构" aria-hidden="true">#</a> 1.4 请求报文结构</h3><p>其中bizContent的值为请求内容，sign的值为签名内容。</p><table><thead><tr><th style="text-align:left;">参数名称</th><th style="text-align:left;">类型</th><th style="text-align:left;">出现要求</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">accessType</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">固定值为&quot;appId&quot;</td></tr><tr><td style="text-align:left;">accessKey</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">由平台颁发的应用标识appId的值</td></tr><tr><td style="text-align:left;">timestamp</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">当前时间戳</td></tr><tr><td style="text-align:left;">signType</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">固定值为&quot;md5&quot;</td></tr><tr><td style="text-align:left;">bizContent</td><td style="text-align:left;">object</td><td style="text-align:left;">R</td><td style="text-align:left;">具体的业务接口参数内容</td></tr><tr><td style="text-align:left;">sign</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">签名内容</td></tr></tbody></table><p><strong>sign签名示例：</strong> 所用工具类由平台方提供</p><p>JAVA版：</p><p>其中bizContent为具体的业务内容(下有示例),appSecret为对应appId的密钥，由平台颁发</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  String sign = MD5Utils.MD5Lower(RSAUtil.sortAndGroupStringParam(bizContent), appSecret);
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="_1-4-1-请求报文示例" tabindex="-1"><a class="header-anchor" href="#_1-4-1-请求报文示例" aria-hidden="true">#</a> 1.4.1 请求报文示例</h4><p>请求示例</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    /**
     * 退款查询
     */
    public static void refundQuery(String mchRefundNo){
        HashMap&lt;String, Object&gt; params = new HashMap&lt;&gt;();
        params.put(&quot;mchRefundNo&quot;, mchRefundNo);

        String json = JSON.toJSONString(params);
        System.out.println(json);

        Map&lt;String,Object&gt; request = new HashMap&lt;&gt;();
        request.put(&quot;timestamp&quot;, &quot;&quot;+new Date().getTime());
        request.put(&quot;accessKey&quot;, appId);
        request.put(&quot;accessType&quot;, &quot;appId&quot;);
        request.put(&quot;bizContent&quot;, json);
        request.put(&quot;signType&quot;, &quot;md5&quot;);//暂时只支持md5

        String s = MD5Utils.MD5Lower(RSAUtil.sortAndGroupStringParam(request), appSecret);
        request.put(&quot;sign&quot;,s);
        System.out.println(&quot;请求内容&quot;);
        System.out.println(JSON.toJSONString(request));
        String ss = HttpClientUtil.doPost(&quot;http://127.0.0.1:3394/pay/refundQuery&quot;, JSON.toJSONString(request), &quot;utf-8&quot;);
        System.out.println(ss);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>请求明文</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> {
    &quot;accessType&quot;: &quot;appId&quot;,
    &quot;accessKey&quot;: &quot;bd9d636e7895dcfc8de05f331&quot;,
    &quot;bizContent&quot;: &quot;{&#39;mchRefundNo&#39;:&#39;0300442390397&#39;}&quot;,
    &quot;sign&quot;: &quot;ae96326b98246e8e535383e9e279d367&quot;,
    &quot;signType&quot;: &quot;md5&quot;,
    &quot;timestamp&quot;: &quot;1694758628031&quot;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_1-5-响应报文结构" tabindex="-1"><a class="header-anchor" href="#_1-5-响应报文结构" aria-hidden="true">#</a> 1.5 响应报文结构</h3><p>所有接口响应均采用JSON格式，如无特殊说明，每次请求的返回值中，都包含下列字段：</p><table><thead><tr><th style="text-align:left;">参数名称</th><th style="text-align:left;">类型</th><th style="text-align:left;">出现要求</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">sign</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">响应签名，用来调用方自身进行安全验证</td></tr><tr><td style="text-align:left;">data</td><td style="text-align:left;">object</td><td style="text-align:left;">R</td><td style="text-align:left;">返回的具体内容，返回结构如下</td></tr></tbody></table><p>data的结构</p><table><thead><tr><th style="text-align:left;">参数名称</th><th style="text-align:left;">类型</th><th style="text-align:left;">出现要求</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">resp_code</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">响应码，200成功，其他均为处理失败</td></tr><tr><td style="text-align:left;">resp_msg</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">响应消息</td></tr><tr><td style="text-align:left;">...</td><td style="text-align:left;"></td><td style="text-align:left;">o</td><td style="text-align:left;">其他字段，不同接口返回字段不相同</td></tr></tbody></table><h4 id="_1-5-1-响应报文示例" tabindex="-1"><a class="header-anchor" href="#_1-5-1-响应报文示例" aria-hidden="true">#</a> 1.5.1 响应报文示例</h4><p>失败:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;data&quot;: {
        &quot;resp_code&quot;: &quot;999&quot;,
        &quot;resp_msg&quot;: &quot;未查询到该支付订单&quot;
    },
    &quot;sign&quot;: &quot;371ac145aa1d511e8f32a02dd88ccb6a&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>成功:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> {
    &quot;data&quot;: {
        &quot;resp_code&quot;: &quot;200&quot;,
        &quot;resp_msg&quot;: &quot;SUCCESS&quot;,
        &quot;refundOrderId&quot;: &quot;R1701876621931778049&quot;,
        &quot;payOrderId&quot;: &quot;P1701875523179319298&quot;,
        &quot;mchNo&quot;: &quot;MS254685666&quot;,
        &quot;isvNo&quot;: null,
        &quot;appId&quot;: &quot;bd9d636e7895dcfc8de05f331&quot;,
        &quot;mchType&quot;: 1,
        &quot;mchRefundNo&quot;: &quot;0300442390397&quot;,
        &quot;payAmount&quot;: 10,
        &quot;refundAmount&quot;: 5,
        &quot;currency&quot;: &quot;CNY&quot;,
        &quot;state&quot;: 2,
        &quot;refundReason&quot;: &quot;测试4&quot;,
        &quot;errCode&quot;: null,
        &quot;errMsg&quot;: null,
        &quot;notifyUrl&quot;: null,
        &quot;successTime&quot;: null
    },
    &quot;sign&quot;: &quot;9915df7ea7764ee9a197baccd51b2ca5&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_1-5-2-响应码说明" tabindex="-1"><a class="header-anchor" href="#_1-5-2-响应码说明" aria-hidden="true">#</a> 1.5.2 响应码说明</h4><table><thead><tr><th style="text-align:left;">resp_code</th><th style="text-align:left;">说明</th></tr></thead><tbody><tr><td style="text-align:left;">200</td><td style="text-align:left;">处理成功</td></tr><tr><td style="text-align:left;">999</td><td style="text-align:left;">处理失败</td></tr><tr><td style="text-align:left;">...</td><td style="text-align:left;">处理错误</td></tr></tbody></table><h2 id="_2-接口定义" tabindex="-1"><a class="header-anchor" href="#_2-接口定义" aria-hidden="true">#</a> 2. 接口定义</h2><h3 id="_2-1收银台跳转支付" tabindex="-1"><a class="header-anchor" href="#_2-1收银台跳转支付" aria-hidden="true">#</a> 2.1收银台跳转支付</h3><ul><li><strong>接口说明：</strong> 此接口特殊(下面有示例)，不用请求，按照步骤本地拼接生成一个跳转支付地址即可。</li><li><strong>接口地址：</strong> /shadow/pay</li></ul><h4 id="_2-1-1-bizcontent业务参数" tabindex="-1"><a class="header-anchor" href="#_2-1-1-bizcontent业务参数" aria-hidden="true">#</a> 2.1.1 bizContent业务参数</h4><table><thead><tr><th style="text-align:left;">参数名称</th><th style="text-align:left;">类型</th><th style="text-align:left;">出现要求</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">mchOrderNo</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">商户订单号,唯一</td></tr><tr><td style="text-align:left;">orderName</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">订单名称</td></tr><tr><td style="text-align:left;">orderAmount</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">支付订单金额</td></tr><tr><td style="text-align:left;">returnUrl</td><td style="text-align:left;">string</td><td style="text-align:left;">O</td><td style="text-align:left;">支付成功后跳转的地址</td></tr><tr><td style="text-align:left;">notifyUrl</td><td style="text-align:left;">string</td><td style="text-align:left;">O</td><td style="text-align:left;">支付成分后的通知地址，如果固定，可以配置</td></tr></tbody></table><p>bizContent内容示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
  &quot;mchOrderNo&quot;: &quot;75213826-dd25-42e2-96c3-87dec20c6181&quot;,
  &quot;notifyUrl&quot;: &quot;http://127.0.0.1:3394/demo/notify&quot;,
  &quot;orderAmount&quot;: 10,
  &quot;orderName&quot;: &quot;测试交易-2023-09-15 16:28:10&quot;,
  &quot;returnUrl&quot;: &quot;http://192.168.168.11:7788?r=5&quot;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>拼接跳转支付地址示例:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code> private static void jumpPay() throws IOException {
        HashMap rq = new HashMap&lt;String,Object&gt;();
        rq.put(&quot;mchOrderNo&quot;, UUID.randomUUID().toString());
        rq.put(&quot;orderAmount&quot;,BigDecimal.valueOf(10));
        rq.put(&quot;orderName&quot;,&quot;测试交易-&quot;+ DateUtilSmart.DateFormat_yyyy_MM_dd_HH_mm_ss.format(new Date()));
        rq.put(&quot;returnUrl&quot;, &quot;http://192.168.168.11:7788?r=5&quot;);
        rq.put(&quot;notifyUrl&quot;,&quot;http://127.0.0.1:3394/demo/notify&quot;);
        String json = JSON.toJSONString(rq);
        System.out.println(json);

        Map&lt;String,Object&gt; request = new HashMap&lt;&gt;();
        request.put(&quot;timestamp&quot;, &quot;&quot;+new Date().getTime());
        request.put(&quot;accessKey&quot;, appId);
        request.put(&quot;accessType&quot;, &quot;appId&quot;);
        request.put(&quot;bizContent&quot;, json);
        request.put(&quot;signType&quot;, &quot;md5&quot;);//暂时只支持md5


        String s = MD5Utils.MD5Lower(RSAUtil.sortAndGroupStringParam(request), appSecret);
        System.out.println(s);
        request.put(&quot;sign&quot;,s);
        String urlParam = buildQuery(request, &quot;UTF-8&quot;);
        String payGateUrl = &quot;http://localhost:3394&quot;;
        /**
         * 拼接生成跳转地址
         */
        String url = payGateUrl+&quot;/shadow/pay?&quot;+urlParam;
        System.out.println(url);
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-1-2-结果" tabindex="-1"><a class="header-anchor" href="#_2-1-2-结果" aria-hidden="true">#</a> 2.1.2 结果</h4><pre><code> String url = payGateUrl+&quot;/shadow/pay?&quot;+urlParam;
</code></pre><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>http://localhost:3394/shadow/pay?accessType=appId&amp;accessKey=bd9d636e7895dcfc8de05f331&amp;bizContent=%7B%22orderAmount%22%3A10%2C%22mchOrderNo%22%3A%22e7d57339-9b1e-4948-9385-7250a82045a0%22%2C%22notifyUrl%22%3A%22http%3A%2F%2F127.0.0.1%3A3394%2Fdemo%2Fnotify%22%2C%22returnUrl%22%3A%22http%3A%2F%2F192.168.168.11%3A7788%3Fr%3D5%22%2C%22orderName%22%3A%22%E6%B5%8B%E8%AF%95%E4%BA%A4%E6%98%93-2023-09-15+16%3A39%3A45%22%7D&amp;sign=fff38b0e34b3da64650642ee213b691c&amp;signType=md5&amp;timestamp=1694767185855

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-2-支付订单查询" tabindex="-1"><a class="header-anchor" href="#_2-2-支付订单查询" aria-hidden="true">#</a> 2.2 支付订单查询</h3><ul><li><strong>接口说明：</strong> 获取支付结果</li><li><strong>接口地址：</strong> /pay/orderQuery</li></ul><h4 id="_2-2-1-请求参数" tabindex="-1"><a class="header-anchor" href="#_2-2-1-请求参数" aria-hidden="true">#</a> 2.2.1 请求参数</h4><table><thead><tr><th style="text-align:left;">参数名称</th><th style="text-align:left;">类型</th><th style="text-align:left;">出现要求</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">mchOrderNo</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">商户订单号</td></tr></tbody></table><p>请求内容示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
{
  &quot;mchOrderNo&quot;: &quot;e35b2776-2e1a-4659-a9f5-5101c058e802&quot;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-2-2-返回结果" tabindex="-1"><a class="header-anchor" href="#_2-2-2-返回结果" aria-hidden="true">#</a> 2.2.2 返回结果</h4><table><thead><tr><th style="text-align:left;">参数名称</th><th style="text-align:left;">类型</th><th style="text-align:left;">出现要求</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">mchOrderNo</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">商户订单号</td></tr><tr><td style="text-align:left;">state</td><td style="text-align:left;">int</td><td style="text-align:left;">R</td><td style="text-align:left;">支付状态(2-支付成功, 3-支付失败, 5-已退款, 6-订单关闭)</td></tr><tr><td style="text-align:left;">successTime</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">支付成功时间</td></tr></tbody></table><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;data&quot;: {
        &quot;resp_code&quot;: &quot;200&quot;,
        &quot;resp_msg&quot;: &quot;SUCCESS&quot;,
        &quot;payOrderId&quot;: &quot;P1702584265847959553&quot;,
        &quot;mchNo&quot;: &quot;MS254685666&quot;,
        &quot;appId&quot;: &quot;bd9d636e7895dcfc8de05f331&quot;,
        &quot;appName&quot;: null,
        &quot;mchOrderNo&quot;: &quot;e35b2776-2e1a-4659-a9f5-5101c058e802&quot;,
        &quot;ifCode&quot;: &quot;ALIPAY&quot;,
        &quot;wayCode&quot;: &quot;ALIPAY_QRCODE&quot;,
        &quot;amount&quot;: 10,
        &quot;currency&quot;: &quot;cny&quot;,
        &quot;state&quot;: 2,
        &quot;divisionState&quot;: 0,
        &quot;clientIp&quot;: null,
        &quot;subject&quot;: &quot;测试交易-2023-09-15 15:24:38&quot;,
        &quot;body&quot;: &quot;&quot;,
        &quot;channelOrderNo&quot;: &quot;2023091522001464260500981780&quot;,
        &quot;code&quot;: null,
        &quot;msg&quot;: null,
        &quot;extParam&quot;: null,
        &quot;successTime&quot;: &quot;2023-09-15 15:26:18&quot;,
        &quot;createdAt&quot;: &quot;2023-09-15 15:24:56&quot;,
        &quot;expiredTime&quot;: &quot;2023-09-15 17:24:56&quot;,
        &quot;mchName&quot;: &quot;杭州融御科技有限公司&quot;,
        &quot;returnUrl&quot;: &quot;http://192.168.168.11:7788?r=5&quot;,
        &quot;divisionRecord&quot;: null
    },
    &quot;sign&quot;: &quot;65c1ab86f16bb24e879e8f04c388f1aa&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-3-异步通知返回接口" tabindex="-1"><a class="header-anchor" href="#_2-3-异步通知返回接口" aria-hidden="true">#</a> 2.3 异步通知返回接口</h3><ul><li><strong>接口说明：</strong> 获取支付结果，此接口是影付宝主动调用你的notifyUrl从而告知你支付结果，该功能发送结果最多6次，随着次数增多，延时会增加。当你接受到通知，返回SUCCESS,将停止通知 <strong>强烈建议主动调用支付订单查询接口进行查询支付结果（官方推荐）</strong></li></ul><p>通知示例:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>  &amp;ifCode=ALIPAY&amp;payOrderId=P1702589785510080514&amp;mchOrderNo=bd40500f-00a8-4829-b9f2-83d130329c07&amp;subject=测试交易-2023-09-15+15%3A46%3A50&amp;sign=2eeb0abb42921c54a4e9cf668b96b5f6&amp;channelOrderNo=2023091522001464260500983344&amp;body=&amp;createdAt=2023-09-15+15%3A46%3A52&amp;appId=bd9d636e7895dcfc8de05f331&amp;successTime=2023-09-15+15%3A47%3A46&amp;currency=cny&amp;state=2&amp;divisionState=0&amp;returnUrl=http%3A%2F%2F192.168.168.11%3A7788%3Fr=5&amp;mchNo=MS254685666&amp;amount=10.00&amp;wayCode=ALIPAY_QRCODE&amp;mchName=杭州融御科技有限公司&amp;expiredTime=2023-09-15+17%3A46%3A52#/login
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>处理参考:</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>    /**
     *  接受回调通知demo
     */
    @Response
    @RequestMapping(&quot;notify&quot;)
    public String notify(@RequestParam(required = false) Map&lt;String,Object&gt; map){
        /**
         * 获取签名
         */
        String sign = (String) map.get(&quot;sign&quot;);
        /**
         * 验证签名
         */
        map.remove(&quot;sign&quot;);
        String signMine = MD5Utils.MD5Lower(RSAUtil.sortAndGroupStringParam(map),appSecret);
        if(sign.equals(signMine)){
            System.out.println(&quot;验签成功&quot;);
            /**
             * 业务处理...
             */
        }else{
            throw new RuntimeException(&quot;验签失败&quot;);
        }
        /**
         * 告诉平台已经成功，不要再通知了
         */
        return &quot;SUCCESS&quot;;
    }
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-4-退款" tabindex="-1"><a class="header-anchor" href="#_2-4-退款" aria-hidden="true">#</a> 2.4 退款</h3><ul><li><strong>接口说明：</strong> 发起退款</li><li><strong>接口地址：</strong> /pay/refund</li></ul><h4 id="_2-4-1-请求参数" tabindex="-1"><a class="header-anchor" href="#_2-4-1-请求参数" aria-hidden="true">#</a> 2.4.1 请求参数</h4><table><thead><tr><th style="text-align:left;">参数名称</th><th style="text-align:left;">类型</th><th style="text-align:left;">出现要求</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">mchOrderNo</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">商户订单号</td></tr><tr><td style="text-align:left;">mchRefundNo</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">退款订单号</td></tr><tr><td style="text-align:left;">refundAmount</td><td style="text-align:left;">decimal</td><td style="text-align:left;">R</td><td style="text-align:left;">退款金额</td></tr><tr><td style="text-align:left;">refundReason</td><td style="text-align:left;">string</td><td style="text-align:left;">O</td><td style="text-align:left;">退款原因</td></tr></tbody></table><p>请求内容示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
{
    &quot;mchOrderNo&quot;: &quot;e35b2776-2e1a-4659-a9f5-5101c058e802&quot;,
    &quot;refundReason&quot;: &quot;&quot;,
    &quot;mchRefundNo&quot;: &quot;11996361-c9c3-49d6-9f4e-f5eb44098d1c&quot;,
    &quot;refundAmount&quot;: 1.3
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-4-2-返回结果" tabindex="-1"><a class="header-anchor" href="#_2-4-2-返回结果" aria-hidden="true">#</a> 2.4.2 返回结果</h4><table><thead><tr><th style="text-align:left;">参数名称</th><th style="text-align:left;">类型</th><th style="text-align:left;">出现要求</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">mchOrderNo</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">商户订单号</td></tr><tr><td style="text-align:left;">mchRefundNo</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">退款订单号</td></tr><tr><td style="text-align:left;">state</td><td style="text-align:left;">int</td><td style="text-align:left;">R</td><td style="text-align:left;">退款状态(1-退款中,2-退款成功,3-退款失败,4-退款任务关闭)</td></tr><tr><td style="text-align:left;">successTime</td><td style="text-align:left;">date</td><td style="text-align:left;">R</td><td style="text-align:left;">成功时间</td></tr></tbody></table><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;data&quot;: {
        &quot;resp_code&quot;: &quot;200&quot;,
        &quot;resp_msg&quot;: &quot;SUCCESS&quot;,
        &quot;refundOrderId&quot;: &quot;R1701838229621788673&quot;,
        &quot;payOrderId&quot;: &quot;P1701837610404106241&quot;,
        &quot;mchNo&quot;: &quot;MS254685666&quot;,
        &quot;isvNo&quot;: null,
        &quot;appId&quot;: &quot;bd9d636e7895dcfc8de05f331&quot;,
        &quot;mchType&quot;: 1,
        &quot;mchRefundNo&quot;: &quot;39927403925&quot;,
        &quot;payAmount&quot;: 10,
        &quot;refundAmount&quot;: 1,
        &quot;currency&quot;: &quot;CNY&quot;,
        &quot;state&quot;: 2,
        &quot;refundReason&quot;: &quot;测试&quot;,
        &quot;errCode&quot;: null,
        &quot;errMsg&quot;: null,
        &quot;notifyUrl&quot;: null,
        &quot;successTime&quot;: null
    },
    &quot;sign&quot;: &quot;5fv4b86f16bb24e879e8f04c388f4c44&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2-5-退款查询" tabindex="-1"><a class="header-anchor" href="#_2-5-退款查询" aria-hidden="true">#</a> 2.5 退款查询</h3><ul><li><strong>接口说明：</strong> 退款查询</li><li><strong>接口地址：</strong> /pay/refundQuery</li></ul><h4 id="_2-5-1-请求参数" tabindex="-1"><a class="header-anchor" href="#_2-5-1-请求参数" aria-hidden="true">#</a> 2.5.1 请求参数</h4><table><thead><tr><th style="text-align:left;">参数名称</th><th style="text-align:left;">类型</th><th style="text-align:left;">出现要求</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">mchRefundNo</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">退款订单号</td></tr></tbody></table><p>请求内容示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>
{
    &quot;mchRefundNo&quot;: &quot;11996361-c9c3-49d6-9f4e-f5eb44098d1c&quot;
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h4 id="_2-5-2-返回结果" tabindex="-1"><a class="header-anchor" href="#_2-5-2-返回结果" aria-hidden="true">#</a> 2.5.2 返回结果</h4><table><thead><tr><th style="text-align:left;">参数名称</th><th style="text-align:left;">类型</th><th style="text-align:left;">出现要求</th><th style="text-align:left;">描述</th></tr></thead><tbody><tr><td style="text-align:left;">mchOrderNo</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">商户订单号</td></tr><tr><td style="text-align:left;">mchRefundNo</td><td style="text-align:left;">string</td><td style="text-align:left;">R</td><td style="text-align:left;">退款订单号</td></tr><tr><td style="text-align:left;">state</td><td style="text-align:left;">int</td><td style="text-align:left;">R</td><td style="text-align:left;">退款状态(1-退款中,2-退款成功,3-退款失败,4-退款任务关闭)</td></tr><tr><td style="text-align:left;">successTime</td><td style="text-align:left;">date</td><td style="text-align:left;">R</td><td style="text-align:left;">成功时间</td></tr></tbody></table><p>示例：</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>{
    &quot;data&quot;: {
        &quot;resp_code&quot;: &quot;200&quot;,
        &quot;resp_msg&quot;: &quot;SUCCESS&quot;,
        &quot;refundOrderId&quot;: &quot;R1701838229621788673&quot;,
        &quot;payOrderId&quot;: &quot;P1701837610404106241&quot;,
        &quot;mchNo&quot;: &quot;MS254685666&quot;,
        &quot;isvNo&quot;: null,
        &quot;appId&quot;: &quot;bd9d636e7895dcfc8de05f331&quot;,
        &quot;mchType&quot;: 1,
        &quot;mchRefundNo&quot;: &quot;39927403925&quot;,
        &quot;payAmount&quot;: 10,
        &quot;refundAmount&quot;: 1,
        &quot;currency&quot;: &quot;CNY&quot;,
        &quot;state&quot;: 2,
        &quot;refundReason&quot;: &quot;测试&quot;,
        &quot;errCode&quot;: null,
        &quot;errMsg&quot;: null,
        &quot;notifyUrl&quot;: null,
        &quot;successTime&quot;: null
    },
    &quot;sign&quot;: &quot;5fv4b86f16bb24e879e8f04c388f4c44&quot;
}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,81);function f(y,p){const n=d("ExternalLinkIcon");return s(),a("div",null,[o,c,t("ul",null,[t("li",null,[e("获取支付网关地址: "),t("a",v,[e("http://192.168.200.123:3394"),l(n)]),q]),m,b,t("li",null,[e("获取相关SDK: "),t("a",g,[e("DOWNLOAD"),l(n)])])]),h])}const _=i(r,[["render",f],["__file","jiekouwendang.html.vue"]]);export{_ as default};
